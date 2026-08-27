import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../Apis/products-api";
import { logout } from "../../Apis/auth-api";
export default function ProductsList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function handleLogout() {
    const result = await logout();
    if (result) {
      console.log("Logout successful");
      navigate("/login");
    }
  }
  async function fetchProducts() {
    const data = await getProducts();
    setProducts(data);
    console.log("response", data);
  }

  return (
    <div>
      <h1>Products List</h1>
      <button className="underline text-red-500" onClick={handleLogout}>
        Logout
      </button>
      <table className="table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            Object.values(products).map((product: any) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>{product.created_at}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
