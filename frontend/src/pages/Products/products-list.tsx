import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {  getProductsByUserId, deleteProduct } from "../../Apis/products-api";
import { logout } from "../../Apis/auth-api";
import { jwtDecode } from "jwt-decode";
export default function ProductsList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState();

  //get the user id from the token
  const token = localStorage.getItem("authToken");
  const decodedToken : any = jwtDecode(token as string);
  // console.log("decodedToken", decodedToken);
  const userId = decodedToken.id;

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
    const data = await  getProductsByUserId(userId);
    setProducts(data); 
    console.log("response", data);
  }

  async function handleAddProduct() {
    navigate("/products/add");
  }

  async function handleEditProduct(productId: number) {
    navigate(`/products/add`, { state: { productId } });
  }

  async function handleDeleteProduct(productId: number) {
    
    if(confirm("Are you sure you want to delete this product?")) {
       await deleteProduct(productId);
       fetchProducts(); // Refresh the product list after deletion
    } 
    
  }

  return (
    <div>
      <h1>Products List</h1>
      <button className="underline text-red-500" onClick={handleLogout}>
        Logout
      </button>

      <button className="underline text-blue-500 ml-10" onClick={handleAddProduct}>
        Add New Product
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
                <button 
                onClick={() => handleEditProduct(product.id)}
                  className="border bg-blue-200 rounded p-2 text-black ml-20"
                  >
                    Edit
                  </button>
                <button onClick={() => handleDeleteProduct(product.id)}
                  
                  className="border bg-red-200 rounded p-2 text-black ml-20"
                  > Delete</button>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
