import { useEffect, useState } from "react";

export default function HOC(Component: React.ComponentType<any>) {
  return function wrappedComponent({ isLoading: boolean = true, ...props }) {
    let [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);

    return (
      <div>{isLoading ? <h1> Loading...</h1> : <Component {...props} />}</div>
    );
  }; 
}
