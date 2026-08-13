import { useState, useCallback } from "react";
import { useBlocker, type BlockerFunction } from "react-router-dom";

export default function UseBlocker() {
  const [value, setValue] = useState("");

  let FormFilled = useCallback<BlockerFunction>(() => value !== "", [value]);

  let blocker = useBlocker(FormFilled);
  console.log("blocker", blocker.state);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert(`Form submitted with value: ${value}`);
          setValue("");
        }}
      >
        <label>Name: </label>
        <input
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border"
        />
        <button type="submit" className="border px-4 ml-5">
          Submit
        </button>

        {blocker.state === "blocked" && (
          <div>
            <p>Are you sure you want to leave this page?</p>
            <button type="button" onClick={() => blocker.proceed()}>
              Yes
            </button>
            <button type="button" onClick={() => blocker.reset()}>
              No
            </button>
          </div>
        )}
      </form>
    </>
  );
}
