import { useState, useEffect } from "react";
interface data {
  name: string;
}

export default function Name() {
  const [data, setData] = useState<data>({ name: "Rushang" });
  //   console.log("data", data);
  const [count, setCount] = useState(0);

  let abc = (data.name = "Jay");

  const cnt123 = useEffect(() => {
    // console.log("data", data);
    console.log("count", count);
    let cnt = 100;

    return () => {
      cnt;
      console.log("cnt", cnt);
    };
    // console.log("data", data);
  }, []);

  console.log("cnt123", cnt123);
  console.log("data", data);

  return (
    <>
      <h1>Name: {data.name}</h1>
    </>
  );
}
