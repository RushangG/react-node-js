import { deleteProduct, getProductData } from "../../api/ProductData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function ProductCard({
  productId,
  name,
  price,
  stock,
  category,
  supplierNote,
  handleDeleteProduct,
}: any) {
  const navigate = useNavigate();

  function ProductEdit(productId: number) {
    navigate("/ProductAdd", { state: { productId: productId } });
  }

  function DeleteProduct(productId: number) {
    handleDeleteProduct(productId);
  }

  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 w-64 flex flex-col items-center space-y-2 ">
      <h1>{name}</h1>
      <p>Price: ${price}</p>
      <p>Stock: {stock}</p>
      <p>Category: {category}</p>
      <p className="text-sm text-gray-600">Supplier Note: {supplierNote}</p>
      <div className="flex space-x-2 mt-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            ProductEdit(productId);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => DeleteProduct(productId)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function ProductDashboard() {
  const [productList, setProductList] = useState(() => getProductData());

  function handleDeleteProduct(productId: number) {
    const isDeleted = deleteProduct(productId);
    if (isDeleted) {
      setProductList([...getProductData()]);
    }
  }

  return (
    <>
      <h1> Product Dashboard </h1>

      <div className="flex flex-wrap gap-4">
        {productList.map((product, index) => (
          <ProductCard
            key={index}
            {...product}
            handleDeleteProduct={handleDeleteProduct}
          />
        ))}
      </div>
    </>
  );
}
