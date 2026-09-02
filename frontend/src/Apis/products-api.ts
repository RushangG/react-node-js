import apiClient from "./api-client";
import { jwtDecode } from "jwt-decode";
interface Product {
  name: string;
  description: string;
  price: number;
  stock: number;
}

//get the user id from the token
const token = localStorage.getItem("authToken");
let userId: null;

if (!token) {
  // console.log("No auth token found in local storage");
} else {
  const decodedToken: any = jwtDecode(token as string);
  // console.log("decodedToken", decodedToken);

  userId = decodedToken?.id;
}

export async function getProducts() {
  const products = await apiClient.get("/products");
  return products.data;
}

export async function getProductsByUserId(userId: number) {
  const products = await apiClient.get(`/products/user/${userId}`);
  return products.data;
}

export async function addProduct(product: Product) {
  // console.log("userId in addProduct:", userId); // Log the userId
  let productWithUserId = {
    ...product,
    user_id: userId,
  };

  const response = await apiClient.post("/products", productWithUserId);
  return response.data;
}

export async function updateProduct(productId: number, product: Product) {
  const response = await apiClient.put(`/products/${productId}`, product);
  return response.data;
}

export async function deleteProduct(productId: number) {
  const response = await apiClient.delete(`/products/${productId}`);
  return response.data;
}

export async function getProductById(productId: number) {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
}
