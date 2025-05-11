import { Router } from "express";
import { getPublicationsByCategoryName, getPDFByPublicationId, getPublicationById, getPublicationsByCategoryNew } from "./publication.controller.js";

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

router.get("/pdf/:id", getPDFByPublicationId);

/**
 * @swagger
 * /publication/{id}:
 *   get:
 *     summary: Obtiene una publicación específica por ID
 *     description: Devuelve toda la información de una publicación mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la publicación
 *     responses:
 *       200:
 *         description: Información de la publicación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 publication:
 *                   type: object
 *       404:
 *         description: No se encontró la publicación
 *       500:
 *         description: Error interno del servidor
 */
router.get("/forById/:id", getPublicationById);

router.get("/new/:categoryName", getPublicationsByCategoryNew);

export default router;