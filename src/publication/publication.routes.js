import { Router } from "express";
import { getPublicationsByCategoryName } from "./publication.controller.js";

const router = Router();

/**
 * @swagger
 * /opinionSystem/v1/publication/{categoryName}:
 *   get:
 *     summary: Obtiene las publicaciones por nombre de categoría
 *     description: Devuelve todas las publicaciones asociadas a una categoría específica utilizando el nombre de la categoría.
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la categoría para filtrar las publicaciones
 *     responses:
 *       200:
 *         description: Lista de publicaciones asociadas a la categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID de la publicación
 *                   title:
 *                     type: string
 *                     description: Título de la publicación
 *                   text:
 *                     type: string
 *                     description: Contenido de la publicación
 *                   category:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: ID de la categoría
 *                       name:
 *                         type: string
 *                         description: Nombre de la categoría
 *       404:
 *         description: No se encontraron publicaciones para la categoría especificada
 *       500:
 *         description: Error interno del servidor
 */
router.get("/:categoryName", getPublicationsByCategoryName);

export default router;