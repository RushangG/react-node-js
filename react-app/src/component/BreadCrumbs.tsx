import { useMatches } from "react-router-dom";
import { Link } from "react-router-dom";

type RouteHandle = {
  handle?: {
    path?: string;
  };
};

export default function BreadCrumbs() {
  const rawMatch = useMatches() as RouteHandle[];

  const activeMatch = rawMatch.filter((match) => match.handle?.path);
  return (
    <>
      <nav className="flex" aria-label="Breadcrumb">
        {activeMatch.map((match, index) => (
          <div key={index} className="flex items-center">
            <Link
              to={match.handle?.path as string}
              className="text-blue-500 hover:underline pointer-events-none cursor-not-allowed"
            >
              {match.handle?.path}
              {" / "}
            </Link>
          </div>
        ))}
      </nav>
    </>
  );
}
