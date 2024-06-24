import { Link } from "react-router-dom";

function ErrorPage({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-blue-600">404</h1>
        <p className="mt-4 text-2xl font-semibold">{errorMessage}</p>
        <p className="mt-2 text-gray-600">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link to="/">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Return to the main page
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
