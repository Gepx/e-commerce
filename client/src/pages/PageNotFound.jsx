import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PageNotFound = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="text-gray-500">The page you are looking for does not exist</p>
      <Button
        onClick={handleGoBack}
        className="bg-black text-white hover:bg-gray-700 cursor-pointer mt-4">
        Go Back
      </Button>
    </div>
  );
};

export default PageNotFound;
