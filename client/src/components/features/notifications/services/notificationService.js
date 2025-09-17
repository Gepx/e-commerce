import api from '@/lib/api.js';

const API_BASE = '/user/notifications';

export const getNotifications = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.type) queryParams.append('type', params.type);
  if (params.isRead !== undefined) queryParams.append('isRead', params.isRead);
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);

  const response = await api.get(`${API_BASE}?${queryParams.toString()}`);
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await api.get(`${API_BASE}/unread-count`);
  return response.data;
};

export const markAsRead = async (notificationId) => {
  const response = await api.patch(`${API_BASE}/${notificationId}/read`, {
    isRead: true
  });
  return response.data;
};

export const markAllAsRead = async (type = null) => {
  const body = {};
  if (type) body.type = type;

  const response = await api.patch(`${API_BASE}/mark-all-read`, body);
  return response.data;
};

export const deleteNotification = async (notificationId) => {
  const response = await api.delete(`${API_BASE}/${notificationId}`);
  return response.data;
};

const notificationService = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
};

export default notificationService;
