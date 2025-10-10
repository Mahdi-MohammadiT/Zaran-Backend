import { Router } from "express";
import { create, getAll, remove,update,getOne } from "../Controllers/CategoryCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
const categoryRouter = Router();
categoryRouter.route('/').get(getAll).post(IsAdmin,create);
categoryRouter.route('/:id').get(getOne).delete(IsAdmin,remove).patch(IsAdmin,update);
export default categoryRouter;
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the category
 *           example: 651f3b9d8f3e2c001c9e4c15
 *         title:
 *           type: string
 *           description: Category name
 *           example: Electronics
 *         image:
 *           type: string
 *           description: Path or filename of the category image
 *           example: uploads/categories/electronics.png
 *         supCategory:
 *           type: object
 *           nullable: true
 *           description: Reference to parent category
 *           properties:
 *             id:
 *               type: string
 *               example: 651f3b9d8f3e2c001c9e4c12
 *             title:
 *               type: string
 *               example: Gadgets
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
 *   name: Categories
 *   description: Category management APIs
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories with optional filtering, sorting, field limiting, and pagination
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter categories by title (partial match supported)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort categories by fields, e.g., "createdAt,-title"
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
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: integer
 *                   example: 5
 *                 categories:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Category'
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
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error
 *
 * /api/categories/{id}:
 *   get:
 *     summary: Get a single category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *
 *   patch:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Category name
 *                 example: Electronics
 *               image:
 *                 type: string
 *                 description: Path or filename of the category image
 *                 example: uploads/categories/electronics.png
 *               supCategory:
 *                 type: string
 *                 description: ID of the parent category
 *                 example: 651f3b9d8f3e2c001c9e4c12
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Validation error
 *
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       400:
 *         description: Category cannot be deleted because it is associated with products
 *       404:
 *         description: Category not found
 */
