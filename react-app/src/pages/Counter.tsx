import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
    setCount(count + 2);
    setCount(count + 3);
  }

  function decrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>{count}</h1>

      <button onClick={increment}>Click Increment</button>
      <button onClick={decrement}>Click Decrement</button>
    </div>
  );
}
