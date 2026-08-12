import React from "react";
import { useReducer } from "react";
import { useState } from "react";

export default function UseReducer() {
  const initialCount = { count1: 0, count2: 0 };

  function counterReducer(
    state: { count1: number; count2: number },
    action: { type1: string; type2: string },
  ) {
    switch (action.type1) {
      case "increment":
        return { count1: state.count1 + 1, count2: state.count2 + 2 };
      case "decrement":
        return { count1: state.count1 - 1, count2: state.count2 - 2 };
      case "reset":
        return { count1: 0, count2: 0 };
      default:
        throw new Error("Invalid action type");
    }
  }

  const [counter, counterAction] = useReducer(counterReducer, initialCount);

  return (
    <>
      <div>
        <h1>UseReducer Counter</h1>
        <p>Count 1: {counter.count1}</p>
        <p>Count 2: {counter.count2}</p>
        <button
          onClick={() =>
            counterAction({ type1: "increment", type2: "increment" })
          }
        >
          +
        </button>
        <button
          onClick={() =>
            counterAction({ type1: "decrement", type2: "decrement" })
          }
        >
          -
        </button>
        <button
          onClick={() => counterAction({ type1: "reset", type2: "reset" })}
        >
          Reset
        </button>
      </div>
    </>
  );
}
