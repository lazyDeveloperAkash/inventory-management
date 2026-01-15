import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-14 h-14 text-yellow-500" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900">404</h1>
        <p className="text-lg text-gray-600 mt-2">
          Page not found
        </p>
        <p className="text-sm text-gray-500 mt-1">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
