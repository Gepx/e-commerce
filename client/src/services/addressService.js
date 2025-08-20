import api from '@/lib/api';

class AddressService {
  async getUserAddresses() {
    try {
      const response = await api.get('/user/addresses');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to retrieve addresses!');
    }
  }

  async createAddress(addressData) {
    try {
      const response = await api.post('/user/addresses', addressData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create address!');
    }
  }

  async updateAddress(id, addressData) {
    try {
      const response = await api.put(`/user/addresses/${id}`, addressData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update address!');
    }
  }

  async deleteAddress(id) {
    try {
      const response = await api.delete(`/user/addresses/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete address!');
    }
  }
}

export default new AddressService();
