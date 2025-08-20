import api from '@/lib/api';

class UserService {
  async getUsers(params = {}) {
    try {
      const response = await api.get('/users', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to retrieve user profile!');
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
}

export default new UserService();
