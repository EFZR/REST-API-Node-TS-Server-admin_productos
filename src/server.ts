import express from "express";
import colors from "colors"
import router from "./router";
import db from "./config/db";

const server = express()

//#region config. de servidor

// Conexion a base de datos.
async function connectDb() {
  try {
    await db.authenticate()
    db.sync()
    console.log(colors.cyan.bold("Conexion exitosa a la base de datos"));
  } catch (error) {
    console.log(error);
    console.log(colors.red("Hubo un error al conectar a la base de datos."));
  }
}

connectDb()

// Lectura de datos de body.
server.use(express.json())

//#endregion

//#region Routes

server.use("/api/products", router)

//#endregion

export default server