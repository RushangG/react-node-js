import { type ProductFormValues } from "../pages/ProductPage/ProductAdd";

// const products = [
//   {
//     productId: 1,
//     name: "Product 1",
//     price: 19.99,
//     stock: 10,
//     category: "Category A",
//     supplierNote: "This is a note from the supplier for Product 1.",
//   },
//   {
//     productId: 2,
//     name: "Product 2",
//     price: 29.99,
//     stock: 5,
//     category: "Category B",
//     supplierNote: "This is a note from the supplier for Product 2.",
//   },
// ];

export async function getProductData() {
  const productList = await fetch("http://localhost:5000/api/products");

  const productsNew = await productList.json();

  return productsNew;
}

export async function getProductById(productId: number) {
  const product = await fetch(
    `http://localhost:5000/api/products/${productId}`,
  );
  return await product.json();
}

export async function addProductData({
  product,
}: {
  product: ProductFormValues;
}) {
  product.category = (product.category as any)?.value || null;
  const response = await fetch("http://localhost:5000/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return await response.json();
}

export async function updateProductData(
  productId: number,
  updatedProduct: ProductFormValues,
) {
  updatedProduct.category = (updatedProduct.category as any)?.value || null;
  const response = await fetch(
    `http://localhost:5000/api/products/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    },
  );
  return await response.json();
}

export async function deleteProduct(productId: number) {
  if (confirm("Are you sure you want to delete this product?")) {
    const response = await fetch(
      `http://localhost:5000/api/products/${productId}`,
      {
        method: "DELETE",
      },
    );

    if (response.ok) {
      return true;
    } else {
      console.error(`Product with id ${productId} not found.`);
      return false;
    }
  }
}
