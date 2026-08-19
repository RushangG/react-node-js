import { deleteProduct, getProductData } from "../../api/ProductData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type ProductCardProps = {
  product_id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  supplier_note: string;
  handleDeleteProduct: (productId: number) => void;
};

function ProductCard({
  product_id,
  name,
  price,
  stock,
  category,
  supplier_note,
  handleDeleteProduct,
}: ProductCardProps) {
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
      <p className="text-sm text-gray-600">Supplier Note: {supplier_note}</p>
      <div className="flex space-x-2 mt-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            ProductEdit(product_id);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => DeleteProduct(product_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function ProductDashboard() {
  const [productList, setProductList] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const products = await getProductData();
    setProductList(products);
  }

  console.log("productList", productList);
  async function handleDeleteProduct(productId: number) {
    console.log("Deleting product with id:", productId);
    const isDeleted = await deleteProduct(productId);
    if (isDeleted) {
      fetchData(); // Refresh the product list after deletion
    }
  }

  return (
    <>
      <h1> Product Dashboard </h1>

      <div className="flex flex-wrap gap-4">
        {Object.values(productList).map(
          (product: ProductCardProps, index: number) => (
            <ProductCard
              key={index}
              {...product}
              handleDeleteProduct={handleDeleteProduct}
            />
          ),
        )}
      </div>
    </>
  );
}
