import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProductsByUserId, deleteProduct } from "../../Apis/products-api";
import { useAuth } from "../../components/ContextProvider";

export default function ProductsList() {
  const navigate = useNavigate();

  const [products, setProducts] = useState({});
  const { user } = useAuth();
  const userId = user?.id;

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const data = await getProductsByUserId(userId as number);
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
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(productId);
      fetchProducts();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products List</h1>

      <button
        className="underline text-blue-500 ml-10 mb-4 border p-2  rounded"
        onClick={handleAddProduct}
      >
        Add New Product
      </button>

      {Object.keys(products).length === 0 && (
        <p className="text-gray-500 ml-10">No products found.</p>
      )}

      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          {Object.keys(products).length > 0 && (
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Created At</th>
              <th> actions </th>
            </tr>
          )}
        </thead>
        <tbody>
          {products &&
            Object.values(products).map((product: any) => (
              <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {product.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${product.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.stock}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {product.created_at}
                </td>
                <td className="border border-gray-300 px-2 py-2">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="border bg-blue-200 rounded p-2 text-black ml-5"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="border bg-red-200 rounded p-2 text-black ml-5"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
