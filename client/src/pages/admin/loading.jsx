import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div>
        <Loader2 className="animate-spin min-h-20 min-w-20 text-blue-500" />
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900">Getting data...</h2>
        <p className="text-sm text-gray-600">Please wait...</p>
      </div>

      <div className="flex">
        <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
        <div
          className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: '0.1s' }}></div>
        <div
          className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}
