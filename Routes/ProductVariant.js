import { Router } from "express";
import {
  create,
  getAllProductVariantOfProducts,
  remove,
  update,
} from "../Controllers/ProductVariantCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
const productVariantRouter = Router();
productVariantRouter.route("/").post(IsAdmin, create);
productVariantRouter
  .route("/:id")
  .get(getAllProductVariantOfProducts)
  .patch(IsAdmin, update)
  .delete(IsAdmin, remove);
export default productVariantRouter;
/**
 * @swagger
 * tags:
 *   name: ProductVariants
 *   description: Product Variant management API
 */

/**
 * @swagger
 * /api/product-variants:
 *   post:
 *     summary: Create a new product variant
 *     tags: [ProductVariants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - variantId
 *               - productId
 *               - quantity
 *               - price
 *               - discount
 *               - priceAfterDiscount
 *             properties:
 *               variantId:
 *                 type: string
 *                 description: ID of the variant
 *               productId:
 *                 type: string
 *                 description: ID of the product this variant belongs to
 *               quantity:
 *                 type: number
 *                 minimum: 0
 *               price:
 *                 type: number
 *                 minimum: 0
 *               discount:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *               priceAfterDiscount:
 *                 type: number
 *                 description: Must equal price * (1 - discount/100)
 *     responses:
 *       201:
 *         description: ProductVariant created successfully
 */

/**
 * @swagger
 * /api/product-variants/{id}:
 *   get:
 *     summary: Get all product variants of a specific product
 *     tags: [ProductVariants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Apply filters (e.g. quantity[gte]=10&price[lte]=1000)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields (e.g. price,-createdAt)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields (e.g. price,quantity,discount)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of product variants with filtering, sorting, and pagination
 *
 *   patch:
 *     summary: Update product variant by ID
 *     tags: [ProductVariants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ProductVariant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *               discount:
 *                 type: number
 *               priceAfterDiscount:
 *                 type: number
 *     responses:
 *       200:
 *         description: ProductVariant updated successfully
 *
 *   delete:
 *     summary: Delete product variant by ID
 *     tags: [ProductVariants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ProductVariant ID
 *     responses:
 *       200:
 *         description: ProductVariant deleted successfully
 */
