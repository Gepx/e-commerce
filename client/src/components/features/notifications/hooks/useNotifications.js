import { useState, useEffect, useCallback } from 'react';
import notificationService from '../services/notificationService.js';

export const useNotifications = (initialParams = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ...initialParams
  });

  const fetchNotifications = useCallback(
    async (resetPage = false) => {
      try {
        setLoading(true);
        setError(null);

        const currentParams = resetPage ? { ...params, page: 1 } : params;
        if (resetPage) {
          setParams(currentParams);
        }

        const response = await notificationService.getNotifications(currentParams);

        if (resetPage || currentParams.page === 1) {
          setNotifications(response.data);
        } else {
          setNotifications((prev) => [...prev, ...response.data]);
        }

        setPagination(response.pagination);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError('Authentication required');
        } else {
          setError(err.message || 'Failed to fetch notifications');
        }
        console.error('Failed to fetch notifications:', err);
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  const loadMore = useCallback(() => {
    if (pagination.hasMore && !loading) {
      setParams((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [pagination.hasMore, loading]);

  const updateFilters = useCallback((newFilters) => {
    setParams((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationService.markAsRead(notificationId);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId ? { ...notification, isRead: true } : notification
        )
      );

      return true;
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
      setError(err.message || 'Failed to mark notification as read');
      return false;
    }
  }, []);

  const markAllAsRead = useCallback(async (type = null) => {
    try {
      await notificationService.markAllAsRead(type);

      setNotifications((prev) =>
        prev.map((notification) =>
          type
            ? notification.type === type
              ? { ...notification, isRead: true }
              : notification
            : { ...notification, isRead: true }
        )
      );

      return true;
    } catch (err) {
      console.error('Failed to mark all notifications as read:', err);
      setError(err.message || 'Failed to mark all notifications as read');
      return false;
    }
  }, []);

  const deleteNotification = useCallback(async (notificationId) => {
    try {
      await notificationService.deleteNotification(notificationId);

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notificationId)
      );

      return true;
    } catch (err) {
      console.error('Failed to delete notification:', err);
      setError(err.message || 'Failed to delete notification');
      return false;
    }
  }, []);

  const refresh = useCallback(() => {
    fetchNotifications(true);
  }, [fetchNotifications]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    loading,
    error,
    pagination,
    params,
    loadMore,
    updateFilters,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    refresh
  };
};
