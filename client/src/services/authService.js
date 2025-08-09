import api from '@/lib/api';

class AuthService {
  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed!');
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed!');
    }
  }

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Logout failed!');
    }
  }
}

export default new AuthService();
