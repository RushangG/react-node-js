import apiClient from "./api-client";

export async function getProducts() {
  const products = await apiClient.get("/products");
  return products.data;
}
