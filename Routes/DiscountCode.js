import { Router } from "express";
import {
  checkDiscountCode,
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/DiscountCodeCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
import IsLogin from "../Middlewares/IsLogin.js";
const discountCodeRouter = Router();
discountCodeRouter.route("/").get(IsAdmin, getAll).post(IsAdmin, create);
discountCodeRouter.route("/check").post(IsLogin,checkDiscountCode);
discountCodeRouter
  .route("/:id")
  .get(IsAdmin, getOne)
  .patch(IsAdmin, update)
  .delete(IsAdmin, remove);

export default discountCodeRouter;
/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discount management and queries
 */

/**
 * @swagger
 * /api/discounts:
 *   get:
 *     summary: Get all discounts
 *     tags: [Discounts]
 *     description: >
 *       Retrieve all discounts with full **Vanta-API** query support, including:
 *       - **Filtering** → `/api/discounts?isActive=true`
 *       - **Sorting** → `/api/discounts?sort=-createdAt`
 *       - **Field Limiting** → `/api/discounts?fields=title,percentage`
 *       - **Pagination** → `/api/discounts?page=2&limit=10`
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         description: Filter discounts by code
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filter discounts by active status
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort results (e.g., "percentage,-createdAt")
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select specific fields (e.g., "code,percentage,expiresAt")
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of discounts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 total:
 *                   type: integer
 *                   example: 25
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Discount'
 */

/**
 * @swagger
 * /api/discounts/{id}:
 *   get:
 *     summary: Get a single discount by ID
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The discount ID
 *     responses:
 *       200:
 *         description: Discount retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Discount'
 *       404:
 *         description: Discount not found
 */

/**
 * @swagger
 * /api/discounts:
 *   post:
 *     summary: Create a new discount
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       201:
 *         description: Discount created successfully
 */

/**
 * @swagger
 * /api/discounts/{id}:
 *   patch:
 *     summary: Update a discount
 *     tags: [Discounts]
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
 *             $ref: '#/components/schemas/Discount'
 *     responses:
 *       200:
 *         description: Discount updated successfully
 */

/**
 * @swagger
 * /api/discounts/{id}:
 *   delete:
 *     summary: Delete a discount
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Discount deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Discount:
 *       type: object
 *       required:
 *         - title
 *         - code
 *         - percentage
 *       properties:
 *         _id:
 *           type: string
 *           example: 652a5f123abccf001fbcdd88
 *         title:
 *           type: string
 *           example: "Black Friday Sale"
 *         code:
 *           type: string
 *           example: "BLACK2025"
 *         percentage:
 *           type: number
 *           example: 30
 *         maxUsage:
 *           type: number
 *           example: 100
 *         usedCount:
 *           type: number
 *           example: 12
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           example: "2025-12-01T00:00:00.000Z"
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

