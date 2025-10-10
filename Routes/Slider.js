import { Router } from "express";
import { create, getAll, remove } from "../Controllers/SliderCn.js";
import IsAdmin from "../Middlewares/IsAdmin.js";
const sliderRouter = Router();
sliderRouter.route('/').get(getAll).post(IsAdmin,create);
sliderRouter.route('/:id').delete(IsAdmin,remove);
export default sliderRouter;
/**
 * @swagger
 * components:
 *   schemas:
 *     Slider:
 *       type: object
 *       required:
 *         - title
 *         - image
 *         - link
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the slider
 *           example: 651f3b9d8f3e2c001c9e4b12
 *         title:
 *           type: string
 *           description: Title of the slider
 *           example: Black Friday Sale
 *         image:
 *           type: string
 *           description: Path or filename of the slider image
 *           example: uploads/sliders/black-friday.jpg
 *         link:
 *           type: string
 *           description: URL link for the slider
 *           example: /products/sale
 *         path:
 *           type: string
 *           description: Path where the slider is displayed
 *           example: home
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
 *   name: Sliders
 *   description: Slider management APIs
 */

/**
 * @swagger
 * /api/sliders:
 *   get:
 *     summary: Get all sliders with optional filtering, sorting, field limiting, and pagination
 *     tags: [Sliders]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter sliders by title (supports partial match)
 *       - in: query
 *         name: path
 *         schema:
 *           type: string
 *         description: Filter sliders by path (e.g., "home")
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort sliders by fields, e.g., "createdAt,-title"
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
 *         description: List of sliders with pagination and filters applied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: integer
 *                   description: Number of sliders returned
 *                   example: 2
 *                 sliders:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Slider'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalResults:
 *                   type: integer
 *                   example: 10
 *
 *   post:
 *     summary: Create a new slider
 *     tags: [Sliders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Slider'
 *     responses:
 *       201:
 *         description: Slider created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Slider'
 *       400:
 *         description: Validation error
 *
 * /api/sliders/{id}:
 *   delete:
 *     summary: Delete a slider by ID
 *     tags: [Sliders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Slider ID
 *     responses:
 *       204:
 *         description: Slider deleted successfully
 *       404:
 *         description: Slider not found
 */
