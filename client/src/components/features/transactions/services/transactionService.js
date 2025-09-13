import api from '@/lib/api';

class TransactionService {
  async createTransaction(transactionData) {
    try {
      const response = await api.post('/user/transactions/create', transactionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create transaction!');
    }
  }

  async createDirectBuyTransaction(customerDetails, items) {
    try {
      const response = await api.post('/user/transactions/direct-buy', { customerDetails, items });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create direct buy transaction!');
    }
  }

  async getTransactions(params = {}) {
    try {
      const response = await api.get('/user/transactions', { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to get transactions!');
    }
  }
}

export default new TransactionService();
