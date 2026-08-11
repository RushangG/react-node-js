import { useEffect, useState } from "react";

export default function useCustomHook(url: string) {
  const [data, setData] = useState({ data: null, time: 0 });
  const startTime = performance.now();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const jsonData = await response.json();
        const endTime = performance.now();
        setData({ data: jsonData, time: endTime - startTime });
        console.log(`Data fetched in ${endTime - startTime} ms`);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [url]);

  return [data.data, data.time];
}
