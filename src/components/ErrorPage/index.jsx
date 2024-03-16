import { Link } from "react-router-dom";

function ErrorPage({ errorMessage }) {
  return (
    <div className="mt-100 text-center text-4xl font-bold">
      <p>{errorMessage}</p>
      <Link to="/">
        <div className="mt-4">Return to the main page</div>
      </Link>
    </div>
  );
}

export default ErrorPage;
