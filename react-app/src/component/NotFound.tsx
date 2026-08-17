import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function NotFound() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="item-center text-center mt-20">
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  console.log(error);
  if (error instanceof Error) {
    return (
      <div className="item-center text-center mt-20">
        <h1>500 Internal Server Error</h1>
        <p>{error.message}</p>
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
