'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { PaystackButton } from 'react-paystack'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { CheckCircle, ShoppingCart, CreditCard, ShieldCheck, AlertCircle } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'
import { formatCurrency } from '@/lib/utils'

const SHIPPING_THRESHOLD = 50
const SHIPPING_FLAT = 10

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  notes: '',
  paymentMethod: 'paystack' as 'paystack' | 'bank',
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [formData, setFormData] = useState(initialForm)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>(
    'idle'
  )
  const [statusMessage, setStatusMessage] = useState('')

  const shipping = subtotal > SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FLAT
  const total = subtotal + shipping
  const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ''

  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.state.trim() !== '' &&
      subtotal > 0
    )
  }, [formData, subtotal])

  const paystackConfig = {
    reference: `CDO-${Date.now()}`,
    email: formData.email,
    amount: Math.round(total * 100), // Paystack expects amount in kobo/cents
    publicKey: paystackPublicKey,
    text: paymentStatus === 'processing' ? 'Processing...' : 'Pay with Paystack',
    metadata: {
      order_notes: formData.notes,
      cart_items: items.map(item => ({
        id: item.productId,
        name: item.name,
        qty: item.quantity,
        price: item.price,
      })),
      custom_fields: [
        {
          display_name: 'Full Name',
          variable_name: 'customer_full_name',
          value: formData.fullName,
        },
        {
          display_name: 'Phone Number',
          variable_name: 'customer_phone',
          value: formData.phone,
        },
        {
          display_name: 'Address',
          variable_name: 'customer_address',
          value: `${formData.address}, ${formData.city}, ${formData.state}`,
        },
      ],
    },
    onSuccess: (reference: any) => {
      setPaymentStatus('success')
      setStatusMessage(`Payment successful! Reference: ${reference.reference}`)
      clearCart()
      router.push('/thank-you?ref=' + reference.reference)
    },
    onClose: () => {
      if (paymentStatus !== 'success') {
        setPaymentStatus('idle')
        setStatusMessage('Payment window closed before completing the transaction.')
      }
    },
  }

  const handleInputChange = (field: keyof typeof initialForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleOfflineCheckout = () => {
    setPaymentStatus('processing')
    setTimeout(() => {
      setPaymentStatus('success')
      setStatusMessage('Order received! Our team will contact you with bank transfer instructions.')
      clearCart()
      router.push('/thank-you')
    }, 1500)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container max-w-3xl text-center">
          <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-6" />
          <h1 className="font-serif text-4xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some items to your cart before checking out.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/store" className="btn-primary px-8">
              Browse Store
            </Link>
            <Link href="/cart" className="btn-outline px-8">
              Review Cart
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container max-w-6xl">
        <div className="flex items-center gap-3 text-primary-700 mb-2">
          <ShieldCheck className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">Secure Checkout</span>
        </div>
        <h1 className="font-serif text-4xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-600 mb-8">Complete your order securely in just a few steps.</p>

        {statusMessage && (
          <div
            className={`mb-6 flex items-center gap-3 rounded-lg border px-4 py-3 text-sm ${
              paymentStatus === 'success'
                ? 'border-green-200 bg-green-50 text-green-800'
                : paymentStatus === 'error'
                ? 'border-red-200 bg-red-50 text-red-800'
                : 'border-yellow-200 bg-yellow-50 text-yellow-800'
            }`}
          >
            {paymentStatus === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : paymentStatus === 'error' ? (
              <AlertCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Contact & Billing */}
            <section className="card space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary-600" />
                <h2 className="font-semibold text-lg">Contact & Billing Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => handleInputChange('fullName', e.target.value)}
                    className="input"
                    placeholder="e.g. Chris Davies"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => handleInputChange('phone', e.target.value)}
                    className="input"
                    placeholder="+234 800 000 0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code</label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={e => handleInputChange('postalCode', e.target.value)}
                    className="input"
                    placeholder="100001"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => handleInputChange('address', e.target.value)}
                    className="input"
                    placeholder="123 Orchestra Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => handleInputChange('city', e.target.value)}
                    className="input"
                    placeholder="Lagos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State/Region</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={e => handleInputChange('state', e.target.value)}
                    className="input"
                    placeholder="Lagos State"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Order Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={e => handleInputChange('notes', e.target.value)}
                  className="input resize-none"
                  rows={3}
                  placeholder="Delivery instructions, gift messages, etc."
                />
              </div>
            </section>

            {/* Payment Method */}
            <section className="card space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary-600" />
                <h2 className="font-semibold text-lg">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label
                  className={clsx(
                    'relative rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-primary-500 transition-colors',
                    formData.paymentMethod === 'paystack' && 'border-primary-500 bg-primary-50 shadow-sm'
                  )}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paystack"
                    checked={formData.paymentMethod === 'paystack'}
                    onChange={e => handleInputChange('paymentMethod', e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="font-semibold">Paystack</p>
                      <p className="text-sm text-gray-500">Pay online with card, USSD, or bank.</p>
                    </div>
                  </div>
                </label>

                <label
                  className={clsx(
                    'relative rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-primary-500 transition-colors',
                    formData.paymentMethod === 'bank' && 'border-primary-500 bg-primary-50 shadow-sm'
                  )}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={e => handleInputChange('paymentMethod', e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="font-semibold">Bank Transfer</p>
                      <p className="text-sm text-gray-500">Receive instructions via email/phone.</p>
                    </div>
                  </div>
                </label>
              </div>

              {formData.paymentMethod === 'bank' && (
                <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900 space-y-3">
                  <p className="font-semibold text-yellow-900">Bank Transfer Instructions</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Account Name</p>
                      <p className="font-semibold text-gray-900">ChrisDavies Orchestra</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Bank</p>
                      <p className="font-semibold text-gray-900">Moniepoint MFB</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Account Number</p>
                      <p className="font-semibold text-gray-900">6354050282</p>
                    </div>
                    <div>
                      <p className="text-gray-600">SWIFT/BIC</p>
                      <p className="font-semibold text-gray-900">GTBINGLA</p>
                    </div>
                  </div>
                  <p>
                    Please complete the transfer within 24 hours to secure your items. Email your payment receipt to
                    <a href="mailto:store@chrisdaviesorchestra.org" className="font-semibold text-primary-700"> store@chrisdaviesorchestra.org</a>
                    {' '}so our team can confirm and finalize your order.
                  </p>
                </div>
              )}

              {formData.paymentMethod === 'paystack' && !paystackPublicKey && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  Paystack public key is missing. Please configure <code>NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY</code> in
                  your environment variables.
                </div>
              )}

              <div className="flex flex-col gap-3">
                {formData.paymentMethod === 'paystack' ? (
                  isFormValid && paystackPublicKey && total > 0 ? (
                    <PaystackButton
                      {...paystackConfig}
                      className="btn-primary w-full"
                    />
                  ) : (
                    <button
                      type="button"
                      className="btn-primary w-full opacity-50 cursor-not-allowed"
                      disabled
                    >
                      Pay with Paystack
                    </button>
                  )
                ) : (
                  <button
                    type="button"
                    onClick={handleOfflineCheckout}
                    disabled={!isFormValid}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm Order &amp; Request Bank Details
                  </button>
                )}
                <p className="text-xs text-gray-500 text-center">
                  By placing this order you agree to our Terms &amp; Conditions and Privacy Policy.
                </p>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="card space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-primary-600" />
              <p className="text-gray-700 font-semibold">Order Summary</p>
            </div>

            <div className="space-y-3">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-500">
                      Qty {item.quantity}
                      {item.size ? ` • Size ${item.size}` : ''}
                      {item.color ? ` • ${item.color}` : ''}
                    </p>
                  </div>
                  <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary-700">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-800 mb-1">Need help?</p>
              <p>Email <a href="mailto:store@chrisdaviesorchestra.org" className="text-primary-600">store@chrisdaviesorchestra.org</a> or call +234 800 000 0000.</p>
            </div>

            <div className="space-y-2 text-xs text-gray-500">
              <p>All transactions are secured and encrypted. Payments are processed via Paystack.</p>
              <p>You&apos;ll receive an order confirmation email immediately after checkout.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

// Tailwind helper class for payment cards (extend utilities)
const paymentOptionStyles = `relative rounded-lg border border-gray-200 p-4 cursor-pointer hover:border-primary-500 transition-colors` as const
