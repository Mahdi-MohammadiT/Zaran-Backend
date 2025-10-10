import { Router } from "express";
import {
  addItemToCart,
  clearCart,
  getCart,
  removeItemFromCart,
} from "../Controllers/CartCn.js";
const cartRouter = Router();
cartRouter.route("/").get(getCart).delete(clearCart);
cartRouter.route("/add-item").post(addItemToCart);
cartRouter.route("/remove-item").delete(removeItemFromCart);
export default cartRouter;

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Manage user shopping cart
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: The ID of the product
 *           example: "66c7f6f2a92b0e12a4e8d3f9"
 *         productVariantId:
 *           type: string
 *           description: The ID of the product variant
 *           example: "66c7f6f2a92b0e12a4e8d410"
 *         categoryId:
 *           type: string
 *           description: The category ID of the product
 *           example: "66c7f6f2a92b0e12a4e8d411"
 *         brandId:
 *           type: string
 *           description: The brand ID of the product
 *           example: "66c7f6f2a92b0e12a4e8d412"
 *         cartQuantity:
 *           type: integer
 *           description: Quantity of this variant in the cart
 *           example: 2
 *         price:
 *           type: number
 *           description: Product price before discount
 *           example: 150000
 *         priceAfterDiscount:
 *           type: number
 *           description: Product price after discount
 *           example: 120000
 *
 *     Cart:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "66d7f6f2a92b0e12a4e8e522"
 *         userId:
 *           type: string
 *           description: The ID of the user who owns this cart
 *           example: "66c7f6f2a92b0e12a4e8d111"
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CartItem'
 *         totalPrice:
 *           type: number
 *           description: Total price before discount
 *           example: 300000
 *         totalPriceAfterDiscount:
 *           type: number
 *           description: Total price after discount
 *           example: 250000
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Get the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user's cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Cart prices updated"]
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized (User not logged in)
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/carts:
 *   delete:
 *     summary: Clear the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully cleared the cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Cart cleared"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/carts/add-item:
 *   post:
 *     summary: Add an item to the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productVariantId
 *             properties:
 *               productVariantId:
 *                 type: string
 *                 description: The ID of the product variant to add
 *                 example: "66c7f6f2a92b0e12a4e8d410"
 *     responses:
 *       200:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Item added to cart"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid productVariantId or product not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/carts/remove-item:
 *   delete:
 *     summary: Remove one quantity of a specific item from the user's cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productVariantId
 *             properties:
 *               productVariantId:
 *                 type: string
 *                 description: The product variant ID to remove
 *                 example: "66c7f6f2a92b0e12a4e8d410"
 *     responses:
 *       200:
 *         description: Item removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Item removed from cart"
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         description: Invalid productVariantId or item not found in cart
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
