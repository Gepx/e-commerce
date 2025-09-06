import api from '@/lib/api';

class WishlistService {
  async getUserWishlist() {
    try {
      const response = await api.get('/user/wishlist');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to retrieved wishlist item!');
    }
  }

  async addItemToWishlist(item) {
    try {
      const response = await api.post('/user/wishlist', item);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add item to wishlist!');
    }
  }

  async removeItemFromWishlist(item) {
    try {
      const response = await api.delete('/user/wishlist', { data: item });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove item from wishlist.');
    }
  }
}

export default new WishlistService();
