import { createContext, useCallback, useState, useEffect, useContext } from 'react';
import authService from '@/components/features/auth/services/authService';

const AuthContext = createContext({ user: null, loading: true });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await authService.me();
      setUser(response.user || null);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    if (res?.user) {
      const normalized = { ...res.user };
      if (!normalized._id && normalized.id) {
        normalized._id = normalized.id;
      }
      setUser(normalized);
    }
    return res;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
