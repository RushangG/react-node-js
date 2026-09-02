import { getAllProducts, getProductById, deleteProductById, createProduct, updateProduct } from "../services/productService.js";

export async function getAllProductsController(req, res) {

    try {
        const products = await getAllProducts();

        res.status(200).json(products);

    }
    catch (err) {
        console.error("Error in getAllProductsController:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function getProductByIdController(req, res) {
    const { id } = req.params;

    try {
        const product = await getProductById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    }
    catch (err) {
        console.error("Error in getProductByIdController:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function deleteProductByIdController(req, res) {
    const { id } = req.params;

    try {
        const result = await deleteProductById(id);
        res.status(200).json({ message: "Product deleted successfully", result });
    }
    catch (error) {
        console.error("Error in deleteProductByIdController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export async function createProductController(req, res) {
    const productData = req.body;

    try {
        const newProduct = await createProduct(productData);
        res.status(201).json(newProduct);
    }
    catch (error) {
        console.error("error in createProductController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

};

export async function updateProductController(req, res) {
    const { id } = req.params;
    const productData = req.body;

    try {
        const updatedProduct = await updateProduct(id, productData);
        res.status(200).json(updatedProduct);
    }
    catch (error) {
        console.error("Error in updateProductController:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};