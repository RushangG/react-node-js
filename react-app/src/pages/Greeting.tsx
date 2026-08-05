import { useState } from "react";

type GreetingProps = {
  name: string;
  age?: number;
};

export default function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <h2> Hello, {name} !</h2>
      {age !== undefined && <p>Your age is {age}.</p>}
    </div>
  );
}

function NameInput() {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  return <input onChange={handleChange} />;
}

NameInput();
