import { useState, createContext, useContext } from "react";
import { useEffect } from "react";

interface User {
  name: string;
  age: number;
}

const UserContext = createContext<User | null>(null);

export default function UseContext() {
  const [user, setUser] = useState({ name: "", age: 0 });
  useEffect(() => {
    setUser({ name: "John11", age: 34 });
  }, []); 
  
  return (
    <>
      <UserContext.Provider value={{ name: user.name, age: user.age }}>
        <h1>{user.name}</h1>
        <p>Age: {user.age}</p>

        <ComponentB/>
      </UserContext.Provider>
    </>
  );
}

function ComponentB() {
  return (
    <>
      <h1>Component B</h1>
      <ComponentC />
      <UserContext.Provider value={{ name: "Jay", age: 22 }}>
        <ComponentC />
      </UserContext.Provider>
    </>
  );
}

function ComponentC() {
  const user = useContext(UserContext);
  
  return (
    <>
     

      <h1>Component C</h1>
      <p>Name: {user?.name}</p>
      <p>Age: {user?.age}</p>
    </>
  );
}
