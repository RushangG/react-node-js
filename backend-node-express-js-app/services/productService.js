import { AppDataSource } from "../config/db.js";
import { ProductModel } from "../models/productModel.js";

const productRepo = AppDataSource.getRepository(ProductModel);

export async function getAllProducts() {
    try {
        const products = await productRepo.query('SELECT * FROM products');
        console.log("Fetched products:", products);
        return products;
    }
    catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
};

export async function getProductById(id) {
    try {
        const product = await productRepo.findOneBy({ product_id: id });
        return product;
    }
    catch (err) {
        console.error("Error fetching product by ID:", err);
        throw err;
    }
};

export async function deleteProductById(id) {
    try {
        const result = await productRepo.delete({ product_id: id });
        return result;
    }
    catch (err) {
        console.error("Error deleting product by ID:", err);
        throw err;
    }
};

export async function createProduct(productData) {
    try {
        const newProduct = productRepo.create(productData);
        const savedProduct = await productRepo.save(newProduct);
        return savedProduct;
    }
    catch (err) {
        console.error("Error creating product:", err);
        throw err;
    }
};

export async function updateProduct(id, productData) {
    try {
        const productUpdate = await productRepo.findOneBy({ product_id: id });
        if (!productUpdate) {
            throw new Error("Product not found");
        }
        await productRepo.update({ product_id: id }, productData);
        const updatedProduct = await productRepo.findOneBy({ product_id: id });
        return updatedProduct;

    }
    catch (err) {
        console.error("Error updating product:", err);
        throw err;
    }
};

