import { Request, Response } from "express";
import Product from "../models/Product.model";

export async function createProduct(req: Request, res: Response) {
  const product: Product = await Product.create(req.body)
  res.status(201).json({ data: product })
}

export async function getProducts(req: Request, res: Response) {
  const products: Product[] = await Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
  })
  res.json({ data: products })
}

export async function getProductById(req: Request, res: Response) {
  const { id } = req.params
  const product: Product = await Product.findByPk(id)
  if (!product) {
    return res.status(404).json({
      error: "producto no encontrado."
    })
  }
  res.json({ data: product })
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params
  const product: Product = await Product.findByPk(id)
  if (!product) {
    return res.status(404).json({
      error: "producto no encontrado."
    })
  }

  await product.update(req.body)
  await product.save()

  res.json({ data: product })
}

export async function updateAvailability(req: Request, res: Response) {
  const { id } = req.params
  const product: Product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({
      error: "producto no encontrado."
    })
  }

  product.availability = !product.dataValues.availability
  await product.save()
  res.json({ data: product })
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params
  const product = await Product.findByPk(id)

  if (!product) {
    return res.status(404).json({
      error: "producto no encontrado."
    })
  }

  await product.destroy()
  res.json({ data: "Producto eliminado" })
}