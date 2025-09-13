import { useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { loadSnap } from '@/lib/snapLoader';
import transactionService from '../services/transactionService';
import useCart from '@/components/features/cart/hooks/useCart';

export const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const { cartItems } = useCart();
  const queryClient = useQueryClient();

  const pay = useCallback(
    async ({ shippingAddressId, customer, selectedItemIds }) => {
      setLoading(true);
      setError(null);
      try {
        const transactionData = {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          shippingAddressId: shippingAddressId
        };

        if (selectedItemIds && selectedItemIds.length > 0) {
          transactionData.selectedItemIds = selectedItemIds;
        }

        const { token, orderId } = await transactionService.createTransaction(transactionData);
        await loadSnap();
        const outcome = await new Promise((resolve, reject) => {
          window.snap.pay(token, {
            onSuccess: (res) => {
              resolve({ type: 'success', orderId, res });
            },
            onPending: (res) => {
              resolve({ type: 'pending', orderId, res });
            },
            onError: (res) => {
              resolve({ type: 'error', orderId, res });
            },
            onClose: (res) => {
              resolve({ type: 'close', orderId, res });
            }
          });
        });

        if (outcome.type === 'success' || outcome.type === 'pending') {
          queryClient.invalidateQueries({ queryKey: ['cartItems'] });
          setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['cartItems'] });
          }, 3000);
        }

        setResult(outcome);
        return outcome;
      } catch (error) {
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [cartItems]
  );

  const directBuy = useCallback(async ({ shippingAddressId, customer, items }) => {
    setLoading(true);
    setError(null);
    try {
      const { token, orderId } = await transactionService.createDirectBuyTransaction(
        {
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          shippingAddressId: shippingAddressId
        },
        items
      );
      await loadSnap();
      const outcome = await new Promise((resolve, reject) => {
        window.snap.pay(token, {
          onSuccess: (res) => {
            resolve({ type: 'success', orderId, res });
          },
          onPending: (res) => {
            resolve({ type: 'pending', orderId, res });
          },
          onError: (res) => {
            resolve({ type: 'error', orderId, res });
          },
          onClose: (res) => {
            resolve({ type: 'close', orderId, res });
          }
        });
      });

      setResult(outcome);
      return outcome;
    } catch (error) {
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    pay,
    directBuy,
    loading,
    result,
    error
  };
};
