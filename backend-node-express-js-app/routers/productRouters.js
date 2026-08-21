import express from 'express';
import { getAllProductsController, getProductByIdController, deleteProductByIdController, createProductController, updateProductController } from '../controllers/productController.js';
import { middlewareFunction } from "../middleware/middlewareFunction.js";
const productRouter = express.Router();

productRouter.get('/', middlewareFunction, getAllProductsController);
productRouter.get('/:id', getProductByIdController);
productRouter.delete('/:id', deleteProductByIdController);
productRouter.post('/', createProductController);
productRouter.put('/:id', updateProductController);

export default productRouter;