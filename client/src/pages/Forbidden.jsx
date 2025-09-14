import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  if (user !== 'admin') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Forbidden</h1>
        <p className="text-gray-500">You are not authorized to access this page</p>
        <Button
          onClick={handleGoBack}
          className="bg-black text-white hover:bg-gray-700 cursor-pointer mt-4">
          Go Back
        </Button>
      </div>
    );
  }
};

export default Forbidden;
