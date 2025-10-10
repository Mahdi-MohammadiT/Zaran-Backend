import { Router } from "express";
import { create, getAll, remove,update,getOne } from "../Controllers/BrandCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
const brandRouter = Router();
brandRouter.route('/').get(getAll).post(IsAdmin,create);
brandRouter.route('/:id').get(getOne).delete(IsAdmin,remove).patch(IsAdmin,update);
export default brandRouter;
/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       required:
 *         - title
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the brand
 *           example: 651f3b9d8f3e2c001c9e4c12
 *         title:
 *           type: string
 *           description: Brand name
 *           example: Apple
 *         image:
 *           type: string
 *           description: Path or filename of the brand image
 *           example: uploads/brands/apple.png
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-16T10:15:30Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-16T12:00:00Z
 */

/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management APIs
 */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands with optional filtering, sorting, field limiting, and pagination
 *     tags: [Brands]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter brands by title (partial match supported)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort brands by fields, e.g., "createdAt,-title"
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields to return, comma-separated, e.g., "title,image"
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
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of brands
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: integer
 *                   example: 5
 *                 brands:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Brand'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 2
 *                 totalResults:
 *                   type: integer
 *                   example: 10
 *
 *   post:
 *     summary: Create a new brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Validation error
 *
 * /api/brands/{id}:
 *   get:
 *     summary: Get a single brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Brand ID
 *     responses:
 *       200:
 *         description: Brand details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Brand not found
 *
 *   patch:
 *     summary: Update a brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Brand ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Brand name
 *                 example: Apple
 *               image:
 *                 type: string
 *                 description: Path or filename of the brand image
 *                 example: uploads/brands/apple.png
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Validation error
 *
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Brand ID
 *     responses:
 *       204:
 *         description: Brand deleted successfully
 *       400:
 *         description: Brand cannot be deleted because it is associated with products
 *       404:
 *         description: Brand not found
 */
