import { useEffect, useState, useCallback } from 'react';
import transactionService from '../services/transactionService';

export const useTransactions = (initialParams = {}) => {
  const [params, setParams] = useState({ page: 1, limit: 10, ...initialParams });
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchList = useCallback(
    async (overrides = {}) => {
      setLoading(true);
      setError(null);
      try {
        const merged = { ...params, ...overrides };
        const res = await transactionService.getTransactions(merged);
        setData(res.data || []);
        setPagination(
          res.pagination || { total: 0, page: merged.page, limit: merged.limit, totalPages: 0 }
        );
        setParams(merged);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [params]
  );

  useEffect(() => {
    fetchList();
  }, []);

  return { data, pagination, loading, error, refetch: fetchList, params, setParams };
};
