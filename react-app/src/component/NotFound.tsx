import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  const navigate = useNavigate();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="item-center text-center mt-20">
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  console.log(error);
  if (error instanceof Error) {
    return (
      <div className="item-center text-center mt-20">
        <h1>500 Internal Server Error</h1>
        <p>{error.message}</p>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 cursor-pointer hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="item-center text-center mt-20">
        <h1>404 Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
    </>
  );
}
