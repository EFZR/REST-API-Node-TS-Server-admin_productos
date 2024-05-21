import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {
  res.json("Desde GET")
})

router.put("/", (req, res) => {
  res.json("Desde PUT")
})

router.post("/", (req, res) => {
  res.json("Desde POST")
})

router.delete("/", (req, res) => {
  res.json("Desde DELETE")
})

export default router;