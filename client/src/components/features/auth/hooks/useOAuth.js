const useOAuth = () => {
  const handleOAuthLogin = (provider) => {
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:3000/api').replace(
      /\/api$/,
      ''
    );
    window.location.href = `${baseUrl}/api/auth/${provider}`;
  };

  const loginWithGoogle = () => handleOAuthLogin('google');
  const loginWithGithub = () => handleOAuthLogin('github');

  return {
    loginWithGoogle,
    loginWithGithub,
    handleOAuthLogin
  };
};

export default useOAuth;
