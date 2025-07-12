import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { itemsAPI, swapsAPI } from '../lib/api';
import { Item, Swap } from '../types';
import ItemCard from '../components/UI/ItemCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { Plus, Package, ArrowRightLeft, Star, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [userSwaps, setUserSwaps] = useState<Swap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, swapsResponse] = await Promise.all([
        itemsAPI.getAllItems({ userId: user?.Id }),
        swapsAPI.getUserSwaps(),
      ]);
      
      setUserItems(itemsResponse.data);
      setUserSwaps(swapsResponse.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendingSwaps = userSwaps.filter(swap => swap.status === 'PENDING');
  const completedSwaps = userSwaps.filter(swap => swap.status === 'COMPLETED');

  const stats = [
    {
      icon: Package,
      label: 'Listed Items',
      value: userItems.length,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: ArrowRightLeft,
      label: 'Active Swaps',
      value: pendingSwaps.length,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Star,
      label: 'Completed Swaps',
      value: completedSwaps.length,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: TrendingUp,
      label: 'Points Balance',
      value: user?.points || 0,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600">Manage your items and track your swapping activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">My Items</h2>
                <Link to="/add-item" className="btn-primary flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </Link>
              </div>

              {userItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userItems.slice(0, 4).map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No items listed yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start by listing your first item to begin swapping!
                  </p>
                  <Link to="/add-item" className="btn-primary">
                    List Your First Item
                  </Link>
                </div>
              )}

              {userItems.length > 4 && (
                <div className="mt-4 text-center">
                  <Link to="/my-items" className="text-primary-600 hover:text-primary-700 font-medium">
                    View all {userItems.length} items →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            {/* Pending Swaps */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Swaps</h3>
              
              {pendingSwaps.length > 0 ? (
                <div className="space-y-3">
                  {pendingSwaps.slice(0, 3).map((swap) => (
                    <div key={swap.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <ArrowRightLeft className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {swap.offeredItem.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {swap.senderId === user?.Id ? 'Sent to' : 'Received from'} {
                            swap.senderId === user?.Id ? swap.receiver.username : swap.sender.username
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No pending swaps</p>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/add-item" className="block w-full btn-primary text-center">
                  List New Item
                </Link>
                <Link to="/browse" className="block w-full btn-outline text-center">
                  Browse Items
                </Link>
                <Link to="/swaps" className="block w-full btn-secondary text-center">
                  View All Swaps
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;