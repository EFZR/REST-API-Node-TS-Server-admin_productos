import express from "express";
import router from "./router";
import db from "./config/db";

const server = express()

// Conexion a base de datos
async function connectDb() {
  try {
    await db.authenticate()
    db.sync()
    console.log("Conexion exitosa a la base de datos");
  } catch (error) {
    console.log(error);
    console.log("Hubo un error al conectar a la base de datos.");
  }
}

connectDb()


//#region Routes

server.use("/api/products",router)

//#endregion

export default server