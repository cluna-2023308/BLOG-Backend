import { body, param } from "express-validator";
import { commentExists } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createCommentValidator = [
    body("text").notEmpty().withMessage("El texto es requerido"),
    validarCampos,
    handleErrors
]