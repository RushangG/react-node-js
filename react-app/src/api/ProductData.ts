import { type ProductFormValues } from "../pages/ProductPage/ProductAdd";

const products = [
  {
    productId: 1,
    name: "Product 1",
    price: 19.99,
    stock: 10,
    category: "Category A",
    supplierNote: "This is a note from the supplier for Product 1.",
  },
  {
    productId: 2,
    name: "Product 2",
    price: 29.99,
    stock: 5,
    category: "Category B",
    supplierNote: "This is a note from the supplier for Product 2.",
  },
];

export function getProductData() {
  return products;
}

export function getProductById(productId: number) {
  return products.find((product) => product.productId === productId);
}

export function addProductData({ product }: { product: ProductFormValues }) {
  const newProductId = products.length + 1;
  const newProduct = {
    productId: newProductId,
    name: product.name,
    price: product.price,
    stock: product.stock,
    category: product.category?.value || "",
    supplierNote: product.supplierNote
  };
  products.push(newProduct);
  console.log("New product added:", newProduct);
}

export function updateProductData(
  productId: number,
  updatedProduct: ProductFormValues,
) {
  const productIndex = products.findIndex(
    (product) => product.productId === productId,
  );
  if (productIndex !== -1) {
    products[productIndex] = {
      productId: productId,
      name: updatedProduct.name,
      price: updatedProduct.price,
      stock: updatedProduct.stock,
      category: updatedProduct.category?.value || "",
      supplierNote: updatedProduct.supplierNote
    };
    console.log("Product updated:", products[productIndex]);
  } else {
    console.error(`Product with id ${productId} not found.`);
  }
}

export function deleteProduct(productId: number) {
  const productIndex = products.findIndex(
    (product) => product.productId === productId,
  );
  if (confirm("Are you sure you want to delete this product?")) {
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      console.log(`Product with id ${productId} deleted.`);
      return true;
    } else {
      console.error(`Product with id ${productId} not found.`);
      return false;
    }
  }
}
