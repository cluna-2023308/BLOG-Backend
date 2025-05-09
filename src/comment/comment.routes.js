import { Router } from "express";
import { createComment, updateComment, deleteComment } from "./comment.controller.js";
import { createCommentValidator, updateCommentVaidator, deleteCommentVaidator } from "../middlewares/comment-validator.js";

const router = Router();

/**
 * @swagger
 * /createComment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               publicationId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *       400:
 *         description: Invalid request
 */
router.post("/createComment", createCommentValidator, createComment);

/**
 * @swagger
 * /updateComment/{id}:
 *   patch:
 *     summary: Update a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *       400:
 *         description: Invalid request
 */
router.patch("/updateComment/:id", updateCommentVaidator, updateComment);

/**
 * @swagger
 * /deleteComment/{id}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *       400:
 *         description: Invalid request
 */
router.delete("/deleteComment/:id", deleteCommentVaidator, deleteComment);

export default router;