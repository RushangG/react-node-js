import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Counter from "./pages/Counter";
import UseContext from "./pages/UseContext";
import Form from "./pages/Form";
export default function App() {
  return (
    <div>
      <nav>
        <Link to="/home"> Home </Link>

        <Link to="/counter"> Counter </Link>

        <Link to="/form"> Form </Link>

        <Link to="/UseContext"> Hook UseContext </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/form" element={<Form />} />
        <Route path="/UseContext" element={<UseContext />} />
      </Routes>
    </div>
  );
}
