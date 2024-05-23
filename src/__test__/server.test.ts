import request from "supertest"
import server, { connectDb } from "../server"
import db from "../config/db"

describe("Nuestro primer test", () => {
  it("Revisar que 1 + 1 sean 2", () => {
    expect(1 + 1).toBe(2)
  })

  it("Revisar que 1 + 1 no sean 3", () => {
    expect(1 + 1).not.toBe(3)
  })
})

describe("GET /api", () => {
  it("should send back a json response", async () => {
    const res = await request(server).get("/api")
    expect(res.status).toBe(200)
    expect(res.body.msg).toBe("Desde API")

    expect(res.status).not.toBe(404)
    expect(res.body.msg).not.toBe("desde PI")
  })
})

jest.mock('../config/db')

describe("Connect DB", () => {
  it("Should handle data base connection error.", async () => {
    jest.spyOn(db, "authenticate")
      .mockRejectedValueOnce(new Error("Hubo un error al conectar a la base de datos."))

    const consoleSpy = jest.spyOn(console, "log")

    await connectDb()

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Hubo un error al conectar a la base de datos.")
    )
  })
})
