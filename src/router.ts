import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from "./handlers/product";
import { handleInputError } from "./middlewares";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Products:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The Product's ID
 *          example: 1
 *        name:
 *          type: string
 *          descripcion: The Product's Name
 *          example: Curve display - 49in
 *        price:
 *          type: number
 *          descripcion: The Product's Price
 *          example: 300.00
 *        availability:
 *          type: boolean
 *          descripcion: The Product's availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags:
 *      - Products
 *    description: Return a new record in the database
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Curve Display 42in"
 *              price:
 *                type: number
 *                example: 399.99
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      400:
 *        description: Bad Requeset - Invalid input data
 */

router.post(
  "/",
  // Validacion
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio."),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido.")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio.")
    .custom((value) => value > 0)
    .withMessage("Precio no valido."),
  handleInputError,
  createProduct
);

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Succesful Response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Products'
 */

router.get("/", handleInputError, getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a products by ID
 *    tags:
 *      - Products
 *    description: Return a products  based on its unique ID
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to retrieve
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succesful Response
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Products'
 *
 *      404:
 *        description: Not Found
 *
 *      400:
 *        description: Bad Request
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no valido."),
  handleInputError,
  getProductById
);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product with user input
 *    tags:
 *      - Products
 *    description: Return the updated product
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to update
 *      required: true
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Curve Display 42in"
 *              price:
 *                type: number
 *                example: 399.99
 *              availability:
 *                type: boolean
 *                example: true
 *    responses:
 *      201:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      400:
 *        description: Bad Requeset - Invalid input data or Invalid ID
 *      404:
 *        description: Product no found
 */

router.put(
  "/:id",
  // Validacion
  param("id").isInt().withMessage("ID no valido."),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio."),
  body("price")
    .isNumeric()
    .withMessage("Valor no valido.")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio.")
    .custom((value) => value > 0)
    .withMessage("Precio no valido."),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no valido."),
  handleInputError,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: update product availability
 *    tags:
 *      - Products
 *    description: Return the updated availability
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to update
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      400:
 *        description: Bad Requeset - Invalid ID
 *      404:
 *        description: Product no found
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no valido."),
  handleInputError,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Deletes a product by a given ID
 *    tags:
 *      - Products
 *    description: Return a confirmation message
 *    parameters:
 *    - in: path
 *      name: id
 *      description: The ID of the product to update
 *      required: true
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: Succesful response
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              value: "Producto Eliminado"
 *      400:
 *        description: Bad Requeset - Invalid ID
 *      404:
 *        description: Product no found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no valido."),
  handleInputError,
  deleteProduct
);

export default router;
