import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { X, ShoppingBag, Gift, Info, Bell } from 'lucide-react';
import { Button } from '../../../ui/button.jsx';
import { cn } from '../../../../lib/utils.js';

const typeIcons = {
  welcome: Gift,
  purchase: ShoppingBag,
  system: Info,
  promotion: Bell
};

const typeColors = {
  welcome: 'text-green-600',
  purchase: 'text-blue-600',
  system: 'text-gray-600',
  promotion: 'text-purple-600'
};

const NotificationItem = ({ notification, onMarkAsRead, onDelete, compact = false }) => {
  const IconComponent = typeIcons[notification.type] || Bell;
  const iconColor = typeColors[notification.type] || 'text-gray-600';

  const handleClick = () => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification._id);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(notification._id);
    }
  };

  return (
    <div
      className={cn(
        'group relative flex gap-3 p-4 rounded-lg border transition-colors cursor-pointer hover:bg-gray-50',
        !notification.isRead && 'bg-blue-50 border-blue-200',
        notification.isRead && 'bg-white border-gray-200',
        compact && 'p-3'
      )}
      onClick={handleClick}>
      {/* Icon */}
      <div
        className={cn(
          'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center',
          !notification.isRead ? 'bg-blue-100' : 'bg-gray-100'
        )}>
        <IconComponent className={cn('w-5 h-5', iconColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4
              className={cn(
                'text-sm font-medium truncate',
                !notification.isRead ? 'text-gray-900' : 'text-gray-700'
              )}>
              {notification.title}
            </h4>
            <p
              className={cn(
                'mt-1 text-sm line-clamp-2',
                !notification.isRead ? 'text-gray-700' : 'text-gray-500'
              )}>
              {notification.message}
            </p>
          </div>

          {/* Delete button */}
          <Button
            variant="ghost"
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 ml-2 flex-shrink-0"
            onClick={handleDelete}>
            <X className="w-3 h-3" />
          </Button>
        </div>

        {/* Timestamp */}
        <p className="mt-2 text-xs text-gray-400">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true
          })}
        </p>

        {/* Unread indicator */}
        {!notification.isRead && (
          <div className="absolute top-4 left-2 w-2 h-2 bg-blue-600 rounded-full"></div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
