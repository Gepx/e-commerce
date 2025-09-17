import React, { useState } from 'react';
import { Bell, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../../../ui/dropdown-menu.jsx';
import { Button } from '../../../ui/button.jsx';
import { Badge } from '../../../ui/badge.jsx';
import NotificationItem from './NotificationItem.jsx';
import { useNotifications } from '../hooks/useNotifications.js';
import { useUnreadCount } from '../hooks/useUnreadCount.js';
import { cn } from '../../../../lib/utils.js';

const NotificationBell = ({ className }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { count, refresh: refreshCount } = useUnreadCount();
  const { notifications, loading, markAsRead, markAllAsRead, deleteNotification, refresh } =
    useNotifications({ limit: 5 });

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
    const success = await markAllAsRead();
    if (success) {
      refreshCount();
      refresh();
    }
  };

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      refresh();
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn('relative cursor-pointer', className)}
          aria-label="Notifications">
          <Bell className="size-6" />
          {count > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 text-xs font-bold p-0 flex items-center justify-center">
              {count > 99 ? '99+' : count}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-96 max-h-96 p-0 bg-white border shadow-lg"
        align="end"
        sideOffset={5}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <DropdownMenuLabel className="p-0 font-semibold">
            Notifications
            {count > 0 && <span className="ml-2 text-xs text-gray-500">({count} new)</span>}
          </DropdownMenuLabel>

          {count > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-auto p-1 text-xs text-blue-600 hover:text-blue-800">
              <Eye className="w-3 h-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications list */}
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-gray-500">
              <Bell className="w-8 h-8 mb-2 text-gray-300" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification._id} className="px-2 py-1">
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    onDelete={handleDelete}
                    compact
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <DropdownMenuItem
                className="w-full justify-center text-blue-600 hover:text-blue-800 cursor-pointer"
                onClick={() => {
                  setOpen(false);
                  navigate('/notifications');
                }}>
                View all notifications
              </DropdownMenuItem>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
