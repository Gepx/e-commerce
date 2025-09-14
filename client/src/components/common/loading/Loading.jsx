import { Loader2 } from 'lucide-react';

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center space-y-2">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
      <p className="text-sm text-gray-500">Loading...</p>
    </div>
  </div>
);

export default Loading;
