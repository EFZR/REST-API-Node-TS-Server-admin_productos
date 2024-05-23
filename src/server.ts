import express from "express";
import colors from "colors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

const server = express()

//#region Configuración del servidor

// Establecer conexión con la base de datos
export async function connectDb() {
  try {
    await db.authenticate()
    await db.sync()
    // Mensaje de éxito en la conexión
    // console.log(colors.cyan.bold("Conexión exitosa a la base de datos"));
  } catch (error) {
    // Mensaje de error en la conexión
    console.log(colors.red("Hubo un error al conectar a la base de datos."));
  }
}

// Iniciar la conexión con la base de datos
connectDb()

// Configurar el servidor para leer datos JSON del cuerpo de las solicitudes
server.use(express.json())

//#endregion

//#region Rutas

// Usar el router para las rutas de los productos
server.use("/api/products", router)

// Ruta de prueba para verificar que la API está funcionando
server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" })
})

// Docs
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

//#endregion

export default server