# Chris Davies Orchestra - Frontend

Modern Next.js 14 frontend application for the Chris Davies Orchestra website.

## 🚀 Features

### Phase 1 (MVP)
- ✅ Home page with hero, featured events, about, news, newsletter
- ✅ Concert schedule with filtering and search
- ✅ Ticketing system with Paystack integration
- ✅ News and blog
- ✅ Contact form
- ✅ Donation system
- ✅ Newsletter subscription

### Phase 2
- ✅ Membership tiers (Free, Silver, Gold, Platinum)
- ✅ Merchandise store
- ✅ Media gallery
- ✅ Reviews and testimonials

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Payments**: Paystack
- **Fonts**: Inter, Playfair Display

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

## 🏃 Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_key
NEXT_PUBLIC_APP_NAME=Chris Davies Orchestra
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── about/             # About page
│   │   ├── concerts/          # Concert pages
│   │   ├── news/              # News pages
│   │   ├── store/             # Merchandise store
│   │   ├── memberships/       # Membership pages
│   │   ├── gallery/           # Media gallery
│   │   ├── contact/           # Contact page
│   │   ├── donate/            # Donation page
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── layout/           # Layout components
│   │   ├── home/             # Home page components
│   │   ├── ui/               # Reusable UI components
│   │   └── providers.tsx     # App providers
│   ├── lib/                   # Utilities
│   │   ├── api.ts            # API client
│   │   └── utils.ts          # Helper functions
│   └── types/                 # TypeScript types
├── public/                    # Static assets
├── .env.example              # Environment template
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── package.json
```

## 🎨 Design System

### Colors

- **Primary**: Purple shades for brand identity
- **Gold**: Accent color for premium features
- **Gray**: Neutral colors for text and backgrounds

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components

All components use Tailwind CSS utility classes with custom classes defined in `globals.css`:

- `.btn` - Base button styles
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.btn-outline` - Outline button
- `.input` - Form input
- `.card` - Card container

## 🔌 API Integration

The app uses Axios for API calls with automatic token management:

```typescript
import { api } from '@/lib/api'

// GET request
const response = await api.get('/events')

// POST request
const response = await api.post('/auth/login', { email, password })
```

Authentication tokens are stored in cookies and automatically included in requests.

## 💳 Payment Integration

Paystack is integrated for payments (tickets, donations, memberships, store):

```typescript
import { usePaystackPayment } from 'react-paystack'

const config = {
  reference: orderNumber,
  email: user.email,
  amount: total * 100, // Convert to kobo
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
}

const initializePayment = usePaystackPayment(config)
```

## 📱 Responsive Design

All pages are fully responsive with mobile-first design:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🧪 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker

```bash
# Build image
docker build -t cdo-frontend .

# Run container
docker run -p 3000:3000 cdo-frontend
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack public key | Yes |
| `NEXT_PUBLIC_APP_NAME` | Application name | No |
| `NEXT_PUBLIC_APP_URL` | Frontend URL | No |

## 🎯 Key Pages

- `/` - Home page
- `/about` - About the orchestra
- `/concerts` - Concert schedule
- `/concerts/[id]` - Concert details
- `/news` - News and blog
- `/news/[slug]` - News article
- `/store` - Merchandise store
- `/store/[slug]` - Product details
- `/memberships` - Membership tiers
- `/gallery` - Media gallery
- `/contact` - Contact form
- `/donate` - Donation page
- `/auth/login` - Login
- `/auth/register` - Registration

## 🐛 Troubleshooting

### API Connection Issues

- Ensure backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in backend

### Payment Issues

- Verify Paystack public key is correct
- Check browser console for errors
- Ensure amounts are in kobo (multiply by 100)

## 📄 License

Copyright © 2026 Chris Davies Orchestra. All rights reserved.

---

**Built with ❤️ using Next.js and TypeScript**
