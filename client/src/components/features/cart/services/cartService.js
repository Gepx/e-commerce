import api from '@/lib/api';

class CartService {
  async getUserCart() {
    try {
      const response = await api.get('/user/cart');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to retrieve cart items!');
    }
  }

  async addItemToCart(item) {
    try {
      const response = await api.post('/user/cart', item);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart!');
    }
  }

  async updateCartItem(item) {
    try {
      const response = await api.put('/user/cart', item);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update item in cart!');
    }
  }

  async removeCartItem(item) {
    try {
      const response = await api.delete('/user/cart', { data: item });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove item from cart!');
    }
  }
}

export default new CartService();
