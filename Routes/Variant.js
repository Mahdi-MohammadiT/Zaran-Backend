import { Router } from "express";
import { create, getAll, remove,update,getOne } from "../Controllers/VariantCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
const variantRouter = Router();
variantRouter.route('/').get(getAll).post(IsAdmin,create);
variantRouter.route('/:id').get(getOne).delete(IsAdmin,remove).patch(IsAdmin,update);
export default variantRouter;
/**
 * @swagger
 * components:
 *   schemas:
 *     Variant:
 *       type: object
 *       required:
 *         - type
 *         - value
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the variant
 *           example: 652f3b9d8f3e2c001c9e4d77
 *         type:
 *           type: string
 *           enum: [color, size]
 *           description: Variant type (e.g., color or size)
 *           example: color
 *         value:
 *           type: string
 *           description: The actual value of the variant
 *           example: Red
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
 *   name: Variants
 *   description: Variant management APIs
 */

/**
 * @swagger
 * /api/variants:
 *   get:
 *     summary: Get all variants with optional filtering, sorting, field limiting, and pagination
 *     tags: [Variants]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [color, size]
 *         description: Filter variants by type
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: Filter variants by value
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort variants by fields, e.g., "createdAt,-value"
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields to return, comma-separated
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
 *         description: List of variants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: integer
 *                   example: 2
 *                 variants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Variant'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 2
 *
 *   post:
 *     summary: Create a new variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variant'
 *     responses:
 *       201:
 *         description: Variant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       400:
 *         description: Validation error
 *
 * /api/variants/{id}:
 *   get:
 *     summary: Get a single variant by ID
 *     tags: [Variants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Variant ID
 *     responses:
 *       200:
 *         description: Variant details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       404:
 *         description: Variant not found
 *
 *   patch:
 *     summary: Update a variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Variant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [color, size]
 *                 example: size
 *               value:
 *                 type: string
 *                 example: XL
 *     responses:
 *       200:
 *         description: Variant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variant'
 *       400:
 *         description: Validation error
 *
 *   delete:
 *     summary: Delete a variant
 *     tags: [Variants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Variant ID
 *     responses:
 *       204:
 *         description: Variant deleted successfully
 *       400:
 *         description: Variant cannot be deleted because it is associated with products
 *       404:
 *         description: Variant not found
 */
