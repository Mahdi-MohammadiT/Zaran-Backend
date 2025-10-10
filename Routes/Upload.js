import express from 'express'
import IsAdmin from '../Middlewares/IsAdmin.js'
import upload from '../Utils/Upload.js'
import { deleteFile, uploadFile, uploadFiles } from '../Controllers/UploadCn.js'


const uploadRouter = express.Router()
uploadRouter.route('/').post(IsAdmin,upload.single('file'),uploadFile)
uploadRouter.route('/multi').post(IsAdmin,upload.array('files',10),uploadFiles)
uploadRouter.route('/:id').delete(IsAdmin,deleteFile)

export default uploadRouter
/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: File upload and delete APIs (Admin only)
 */

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a single file
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *       400:
 *         description: No file uploaded
 *       403:
 *         description: Unauthorized (not admin)
 */

/**
 * @swagger
 * /api/upload/multi:
 *   post:
 *     summary: Upload multiple files (max 10)
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Files uploaded successfully
 *       400:
 *         description: No files uploaded
 *       403:
 *         description: Unauthorized (not admin)
 */

/**
 * @swagger
 * /api/upload/{filename}:
 *   delete:
 *     summary: Delete a file by filename
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: filename
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       404:
 *         description: File not found
 *       403:
 *         description: Unauthorized (not admin)
 */
