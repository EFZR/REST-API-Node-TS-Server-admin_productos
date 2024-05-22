import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability } from "./handlers/product";
import { handleInputError } from "./middlewares";

const router = Router()

router.post(
  "/",
  // Validacion
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacio."),
  body("price")
    .isNumeric().withMessage("Valor no valido.")
    .notEmpty().withMessage("El precio del producto no puede ir vacio.")
    .custom(value => value > 0).withMessage("Precio no valido."),
  handleInputError,
  createProduct
)

router.get(
  "/",
  handleInputError,
  getProducts
)

router.get(
  "/:id",
  param("id")
    .isInt().withMessage("ID no valido"),
  handleInputError,
  getProductById,
)

router.put(
  "/:id",
  // Validacion
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacio."),
  body("price")
    .isNumeric().withMessage("Valor no valido.")
    .notEmpty().withMessage("El precio del producto no puede ir vacio.")
    .custom(value => value > 0).withMessage("Precio no valido."),
  body("availability")
    .isBoolean().withMessage("Valor para disponibilidad no valido."),
  handleInputError,
  updateProduct
)

router.patch(
  "/:id",
  handleInputError,
  updateAvailability
)

router.delete("/", (req, res) => {
  res.json("Desde DELETE")
})


export default router;