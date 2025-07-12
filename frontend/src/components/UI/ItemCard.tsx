import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from '../../types';
import { MapPin, User, Clock } from 'lucide-react';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link to={`/item/${item.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group-hover:-translate-y-1">
        {/* Image */}
        <div className="aspect-square overflow-hidden bg-gray-100">
          {item.images && item.images.length > 0 ? (
            <img
              src={item.images[0].url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span>No image</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-1">
              {item.title}
            </h3>
            <span className={`px-2 py-1 text-xs rounded-full ${
              item.available 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {item.available ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {item.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span className="bg-gray-100 px-2 py-1 rounded">
              {item.category}
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded">
              Size {item.size}
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded">
              {item.condition}
            </span>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {item.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
              {item.tags.length > 3 && (
                <span className="text-xs text-gray-500">+{item.tags.length - 3} more</span>
              )}
            </div>
          )}

          {/* User info */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              {item.user.Image ? (
                <img src={item.user.Image} alt={item.user.username} className="w-6 h-6 rounded-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-gray-400" />
              )}
              <span className="text-sm text-gray-600">{item.user.username}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ItemCard;