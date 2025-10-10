import { Router } from "express";
import { create, getAll, remove,update,getOne } from "../Controllers/AddressCn.js";
const addressRouter = Router();
addressRouter.route('/').get(getAll).post(create);
addressRouter.route('/:id').get(getOne).delete(remove).patch(update);
export default addressRouter;
/**
 * @swagger
 * tags:
 *   - name: Addresses
 *     description: API endpoints for managing user addresses
 *
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       required:
 *         - userId
 *         - title
 *         - receiverPhoneNumber
 *         - receiverFullname
 *         - description
 *         - city
 *         - postalCode
 *         - province
 *         - houseNumber
 *       properties:
 *         id:
 *           type: string
 *           description: MongoDB ObjectId of the address
 *           example: 6510c2f1d85f23001c2a67a3
 *         userId:
 *           type: string
 *           description: MongoDB ObjectId of the user who owns the address
 *           example: 650f3b9d8f3e2c001c9e4a12
 *         title:
 *           type: string
 *           description: Title of the address (e.g. Home, Office)
 *           example: Home
 *         receiverPhoneNumber:
 *           type: string
 *           description: Receiver's phone number (Iran format)
 *           example: "+989123456789"
 *         receiverFullname:
 *           type: string
 *           description: Full name of the receiver
 *           example: Ali Reza Aghaei
 *         description:
 *           type: string
 *           description: Detailed description of the address
 *           example: "Near Azadi Square, 2nd floor, Apt 5"
 *         city:
 *           type: string
 *           description: City name
 *           example: Tehran
 *         postalCode:
 *           type: string
 *           description: Valid 10-digit Iranian postal code
 *           example: "1234567890"
 *         province:
 *           type: string
 *           description: Province name
 *           example: Tehran
 *         lat:
 *           type: number
 *           description: Latitude coordinate
 *           example: 35.6892
 *         lng:
 *           type: number
 *           description: Longitude coordinate
 *           example: 51.3890
 *         houseNumber:
 *           type: string
 *           description: House or apartment number
 *           example: "22"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 * /api/addresses:
 *   get:
 *     summary: Get all addresses
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: JSON string for filtering, e.g. {"city":"Tehran"}
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields, e.g. city,-province
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: Select fields, e.g. title,city
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
 *         description: List of addresses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Address'
 *
 *   post:
 *     summary: Create a new address
 *     tags: [Addresses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       201:
 *         description: Address created successfully
 *
 * /api/addresses/{id}:
 *   get:
 *     summary: Get a single address by ID
 *     tags: [Addresses]
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
 *         description: Address details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Address'
 *
 *   patch:
 *     summary: Update an address by ID
 *     tags: [Addresses]
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
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Address updated successfully
 *
 *   delete:
 *     summary: Delete an address by ID
 *     tags: [Addresses]
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
 *         description: Address deleted successfully
 */
