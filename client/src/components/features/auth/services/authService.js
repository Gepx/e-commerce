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

  async me() {
    try {
      const res = await api.get('/auth/me');
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to retrieve user profile!');
    }
  }

  async requestPasswordOtp(email) {
    try {
      const res = await api.post('/auth/forgot-password', { email });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Request OTP failed!');
    }
  }

  async verifyPasswordOtp({ email, otp }) {
    try {
      const res = await api.post('/auth/verify-otp', { email, otp });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'OTP verification failed!');
    }
  }

  async resetPassword({ token, newPassword }) {
    try {
      const res = await api.post('/auth/reset-password', { token, newPassword });
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Password reset failed!');
    }
  }
}

export default new AuthService();
