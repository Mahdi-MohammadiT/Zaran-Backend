import { Router } from "express";
import { create, getAll, getOne, remove, update } from "../Controllers/ProductCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
const productRouter = Router();
productRouter.route("/").get(getAll).post(IsAdmin,create);
productRouter.route("/:id").get(getOne).patch(IsAdmin,update).delete(IsAdmin,remove);
export default productRouter;
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter query (e.g. categoryId=xxx&brandId=yyy&isPublished=true)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields (e.g. rate,-createdAt)
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Limit returned fields (e.g. title,description,rate)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of products with filtering, sorting, limiting fields, and pagination
 *
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - brandId
 *               - categoryId
 *               - title
 *               - description
 *               - slug
 *             properties:
 *               brandId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               information:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     key: 
 *                       type: string
 *                     value:
 *                       type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               slug:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created successfully
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields (e.g. title,description)
 *     responses:
 *       200:
 *         description: Product details
 *
 *   patch:
 *     summary: Update product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: 
 *                 type: string
 *               description: 
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *
 *   delete:
 *     summary: Delete product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
