import api from '@/lib/api';

class UserService {
  async getUsers(params = {}) {
    try {
      const response = await api.get('/users', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to retrieve users information!');
    }
  }

  async getUserProfile(id) {
    try {
      const response = await api.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to retrieve user profile');
    }
  }

  async updateUserProfile(id, profileData) {
    try {
      const response = await api.put(`/users/${id}`, profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user profile!');
    }
  }

  async deleteUserAccount(id) {
    try {
      const response = await api.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete user account!');
    }
  }

  async updateUserAvatar(id, file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const response = await api.put(`/users/${id}/avatar`, formData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update user avatar!');
    }
  }

  async removeUserAvatar(id) {
    try {
      const response = await api.delete(`/users/${id}/avatar`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove user avatar!');
    }
  }
}

export default new UserService();
