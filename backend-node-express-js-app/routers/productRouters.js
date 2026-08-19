import express from 'express';
import { getAllProductsController, getProductByIdController, deleteProductByIdController, createProductController, updateProductController } from '../controllers/productController.js';
const productRouter = express.Router();

productRouter.get('/', getAllProductsController);
productRouter.get('/:id', getProductByIdController);
productRouter.delete('/:id', deleteProductByIdController);
productRouter.post('/', createProductController);
productRouter.put('/:id', updateProductController);

export default productRouter;