import { body, param } from "express-validator";
import { publicationExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createPublicationValidator = [
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("text").notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
]

export const updatePublicationVaidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(publicationExists),
    validarCampos,
    handleErrors
]

export const deletePublicationVaidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(publicationExists),
    validarCampos,
    handleErrors
]

export const getUserPublicationsValidator = [
    validarCampos,
    handleErrors
]