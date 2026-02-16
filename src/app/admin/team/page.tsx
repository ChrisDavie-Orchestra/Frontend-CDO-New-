'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Users, UserCheck, Music, CheckCircle, XCircle } from 'lucide-react';
import { api } from '@/lib/api';

interface Title {
  id: string;
  name: string;
  description?: string;
}

interface Executive {
  id: string;
  name: string;
  role: string;
  description?: string;
  imageUrl?: string;
  orderIndex: number;
  title?: Title;
}

interface BoardMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  orderIndex: number;
  title?: Title;
}

interface Musician {
  id: string;
  name: string;
  role: string;
  section?: string;
  imageUrl?: string;
  orderIndex: number;
  title?: Title;
}

export default function TeamManagement() {
  const [activeTab, setActiveTab] = useState<'executives' | 'board' | 'musicians' | 'titles'>('executives');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
    show: boolean;
  }>({ type: 'success', message: '', show: false });
  const queryClient = useQueryClient();

  // Fetch data
  const { data: executives = [] } = useQuery({
    queryKey: ['executives'],
    queryFn: () => api.get('/team/executives').then(res => res.data),
  });

  const { data: boardMembers = [] } = useQuery({
    queryKey: ['board-members'],
    queryFn: () => api.get('/team/board-members').then(res => res.data),
  });

  const { data: musicians = [] } = useQuery({
    queryKey: ['musicians'],
    queryFn: () => api.get('/team/musicians').then(res => res.data),
  });

  const { data: titles = [] } = useQuery({
    queryKey: ['titles'],
    queryFn: () => api.get('/team/titles').then(res => res.data),
  });

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message, show: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Mutations
  const createMutation = useMutation({
    mutationFn: (data: any) => {
      const endpoint = activeTab === 'executives' ? '/team/executives' :
                       activeTab === 'board' ? '/team/board-members' :
                       activeTab === 'musicians' ? '/team/musicians' :
                       '/team/titles';
      return api.post(endpoint, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activeTab] });
      showNotification('success', `${activeTab.slice(0, -1)} created successfully`);
      setIsModalOpen(false);
      setEditingItem(null);
    },
    onError: (error: any) => {
      showNotification('error', `Failed to create ${activeTab.slice(0, -1)}: ${error.response?.data?.message || 'Unknown error'}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      const endpoint = activeTab === 'executives' ? `/team/executives/${id}` :
                       activeTab === 'board' ? `/team/board-members/${id}` :
                       activeTab === 'musicians' ? `/team/musicians/${id}` :
                       `/team/titles/${id}`;
      return api.patch(endpoint, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activeTab] });
      showNotification('success', `${activeTab.slice(0, -1)} updated successfully`);
      setIsModalOpen(false);
      setEditingItem(null);
    },
    onError: (error: any) => {
      showNotification('error', `Failed to update ${activeTab.slice(0, -1)}: ${error.response?.data?.message || 'Unknown error'}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const endpoint = activeTab === 'executives' ? `/team/executives/${id}` :
                       activeTab === 'board' ? `/team/board-members/${id}` :
                       activeTab === 'musicians' ? `/team/musicians/${id}` :
                       `/team/titles/${id}`;
      return api.delete(endpoint);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [activeTab] });
      showNotification('success', `${activeTab.slice(0, -1)} deleted successfully`);
    },
    onError: (error: any) => {
      showNotification('error', `Failed to delete ${activeTab.slice(0, -1)}: ${error.response?.data?.message || 'Unknown error'}`);
    },
  });

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const renderModal = () => {
    if (!isModalOpen) return null;

    const isTitle = activeTab === 'titles';
    const isExecutive = activeTab === 'executives';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingItem ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                defaultValue={editingItem?.name || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>

            {!isTitle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  name="role"
                  defaultValue={editingItem?.role || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
            )}

            {isExecutive && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}

            {activeTab === 'musicians' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section
                </label>
                <input
                  type="text"
                  name="section"
                  defaultValue={editingItem?.section || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Strings, Woodwind, Percussion"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                defaultValue={editingItem?.imageUrl || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Order Index
              </label>
              <input
                type="number"
                name="orderIndex"
                defaultValue={editingItem?.orderIndex || 0}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <select
                name="titleId"
                defaultValue={editingItem?.titleId || ''}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a title</option>
                {titles.map((title: Title) => (
                  <option key={title.id} value={title.id}>
                    {title.name}
                  </option>
                ))}
              </select>
            </div>

            {isTitle && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={editingItem?.description || ''}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 disabled:opacity-50"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingItem(null);
                }}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderTable = (items: any[], type: string) => {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 capitalize">{type}</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            <Plus className="h-4 w-4" />
            Add {type.slice(0, -1)}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                {type !== 'titles' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                )}
                {type === 'musicians' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Section
                  </th>
                )}
                {type === 'executives' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  {type !== 'titles' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.role}
                    </td>
                  )}
                  {type === 'musicians' && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.section || '-'}
                    </td>
                  )}
                  {type === 'executives' && (
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {item.description || '-'}
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.title?.name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.orderIndex}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Team Management</h1>
        <p className="mt-2 text-gray-600">
          Manage executives, board members, musicians, and titles
        </p>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('executives')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'executives'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <UserCheck className="h-4 w-4 inline mr-2" />
            Executives
          </button>
          <button
            onClick={() => setActiveTab('board')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'board'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="h-4 w-4 inline mr-2" />
            Board Members
          </button>
          <button
            onClick={() => setActiveTab('musicians')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'musicians'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Music className="h-4 w-4 inline mr-2" />
            Musicians
          </button>
          <button
            onClick={() => setActiveTab('titles')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'titles'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Titles
          </button>
        </nav>
      </div>

      {activeTab === 'executives' && renderTable(executives, 'executives')}
      {activeTab === 'board' && renderTable(boardMembers, 'board')}
      {activeTab === 'musicians' && renderTable(musicians, 'musicians')}
      {activeTab === 'titles' && renderTable(titles, 'titles')}

      {renderModal()}

      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <XCircle className="h-5 w-5" />
          )}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}
    </div>
  );
}
