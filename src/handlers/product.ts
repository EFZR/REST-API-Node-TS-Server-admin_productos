import { Request, Response } from "express";
import colors from "colors";
import Product from "../models/Product.model";

export async function createProduct(req: Request, res: Response) {
  try {
    const product: Product = await Product.create(req.body)
    res.json({ data: product })
  } catch (error) {
    console.log(colors.red(error));
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const products: Product[] = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
    })
    res.json({ data: products })
  } catch (error) {
    console.log(colors.red(error));
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const product: Product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({
        error: "producto no encontrado"
      })
    }
    res.json({ data: product })
  } catch (error) {
    console.log(colors.red(error));
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params
    const product: Product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({
        error: "producto no encontrado"
      })
    }

    await product.update(req.body)
    await product.save()

    res.json({ data: product })
  } catch (error) {
    console.log(colors.red(error));
  }
}

export async function updateAvailability(req: Request, res: Response) {
  try {
    const { id } = req.params
    const product: Product = await Product.findByPk(id)
    if (!product) {
      return res.status(404).json({
        error: "producto no encontrado"
      })
    }

    product.availability = !product.dataValues.availability
    await product.save()
    res.json({ data: product })
  } catch (error) {
    console.log(colors.red(error));
  }
}