import React from "react";
import { useRef, useState } from "react";

export default function UseRef() {
  const inputRef = useRef<HTMLInputElement>(null);

  const timerRef = useRef<number>(null);

  const [second, setSecond] = useState(1);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      console.log("Timer tick", timerRef.current, "Second:", { second });
      setSecond((prevSecond) => prevSecond + prevSecond);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current!);
  };

  return (
    <>
      <h1>UseRef Example</h1>

      <div>
        <input
          ref={inputRef}
          type="text"
          name="text-input"
          placeholder="Enter text..."
        />
        <button onClick={handleClick}>Focus Input</button>
      </div>

      <div>
        <button onClick={startTimer}>Start Timer</button>
        <button onClick={stopTimer}>Stop Timer</button>

        <p>Seconds: {second}</p>
      </div>
    </>
  );
}
