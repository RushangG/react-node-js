import { useEffect, useState, useMemo } from "react";

export default function useCustomHook(url: string) {
  const [data, setData] = useState();
  const [time, setTime] = useState(0);
  const startTime = performance.now();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        const endTime = performance.now();
        setData(jsonData);
        setTime(endTime - startTime);
        console.log(`Data fetched in ${endTime - startTime} ms`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      console.log("Cleanup function called");
      setData(undefined);
      setTime(0);
    };
  }, [url]);

  return [data, time];
}
