import { useState, useEffect, useCallback } from 'react';
import notificationService from '../services/notificationService.js';

export const useUnreadCount = (autoRefresh = true, interval = 60000) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUnreadCount = useCallback(async () => {
    try {
      setError(null);
      const response = await notificationService.getUnreadCount();
      setCount(response.count);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Authentication required');
        setCount(0);
      } else {
        setError(err.message || 'Failed to fetch unread count');
      }
      console.error('Failed to fetch unread count:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  const incrementCount = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrementCount = useCallback(() => {
    setCount((prev) => Math.max(0, prev - 1));
  }, []);

  const resetCount = useCallback(() => {
    setCount(0);
  }, []);

  const updateCount = useCallback((newCount) => {
    setCount(Math.max(0, newCount));
  }, []);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      fetchUnreadCount();
    }, interval);

    return () => clearInterval(intervalId);
  }, [autoRefresh, interval, fetchUnreadCount]);

  return {
    count,
    loading,
    error,
    refresh,
    incrementCount,
    decrementCount,
    resetCount,
    updateCount
  };
};
