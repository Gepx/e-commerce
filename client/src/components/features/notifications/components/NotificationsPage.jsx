import React, { useState } from 'react';
import { Bell, Eye, RefreshCw } from 'lucide-react';
import { Button } from '../../../ui/button.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../ui/select.jsx';
import { Badge } from '../../../ui/badge.jsx';
import { useNotifications } from '../hooks/useNotifications.js';
import { useUnreadCount } from '../hooks/useUnreadCount.js';
import NotificationItem from './NotificationItem.jsx';

const NotificationsPage = () => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [readFilter, setReadFilter] = useState('all');

  const {
    notifications,
    loading,
    error,
    pagination,
    loadMore,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh,
    updateFilters
  } = useNotifications({
    ...(typeFilter !== 'all' && { type: typeFilter }),
    ...(readFilter === 'read' && { isRead: true }),
    ...(readFilter === 'unread' && { isRead: false })
  });

  const { count, refresh: refreshCount } = useUnreadCount();

  const handleMarkAsRead = async (notificationId) => {
    const success = await markAsRead(notificationId);
    if (success) {
      refreshCount();
    }
  };

  const handleDelete = async (notificationId) => {
    const success = await deleteNotification(notificationId);
    if (success) {
      refreshCount();
    }
  };

  const handleMarkAllAsRead = async () => {
    const success = await markAllAsRead(typeFilter !== 'all' ? typeFilter : null);
    if (success) {
      refreshCount();
    }
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'type') {
      setTypeFilter(value);
      const filters = {};
      if (value !== 'all') filters.type = value;
      if (readFilter === 'read') filters.isRead = true;
      if (readFilter === 'unread') filters.isRead = false;
      updateFilters(filters);
    } else if (filterType === 'read') {
      setReadFilter(value);
      const filters = {};
      if (typeFilter !== 'all') filters.type = typeFilter;
      if (value === 'read') filters.isRead = true;
      if (value === 'unread') filters.isRead = false;
      updateFilters(filters);
    }
  };

  const typeLabels = {
    all: 'All Types',
    welcome: 'Welcome',
    purchase: 'Purchase',
    system: 'System',
    promotion: 'Promotion'
  };

  const readLabels = {
    all: 'All Notifications',
    unread: 'Unread Only',
    read: 'Read Only'
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold">Notifications</h3>
          {count > 0 && (
            <Badge variant="secondary" className="ml-2">
              {count} unread
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refresh} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          {count > 0 && (
            <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
              <Eye className="w-4 h-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Type:</label>
            <Select value={typeFilter} onValueChange={(value) => handleFilterChange('type', value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(typeLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Status:</label>
            <Select value={readFilter} onValueChange={(value) => handleFilterChange('read', value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(readLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-gray-500">
            {pagination.total || 0} notification{pagination.total !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div>
        {error ? (
          <div className="flex flex-col items-center justify-center py-12 text-red-500">
            <p className="text-sm">Error loading notifications: {error}</p>
            <Button variant="outline" size="sm" className="mt-3" onClick={refresh}>
              Try Again
            </Button>
          </div>
        ) : loading && notifications.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Bell className="w-12 h-12 mb-4 text-gray-300" />
            <h3 className="text-lg font-medium mb-2">No notifications found</h3>
            <p className="text-sm">
              {typeFilter !== 'all' || readFilter !== 'all'
                ? 'Try adjusting your filters to see more notifications.'
                : "You don't have any notifications yet."}
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div key={notification._id} className="p-4">
                <NotificationItem
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {pagination.hasMore && !loading && (
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full" onClick={loadMore} disabled={loading}>
              Load More Notifications
            </Button>
          </div>
        )}

        {/* Loading More Indicator */}
        {loading && notifications.length > 0 && (
          <div className="flex items-center justify-center py-4 border-t">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
