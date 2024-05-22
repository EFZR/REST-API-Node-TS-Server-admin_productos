import { exit } from "node:process"
import colors from "colors"
import db from "../config/db"

const clearDB = async () => {
  try {
    await db.sync({ force: true })
    console.log(colors.green("datos eliminados con exito."))
    exit(0)
  } catch (error) {
    console.log(colors.red(error));
    exit(1)
  }
}

if (process.argv[2] === "--clear") {
  clearDB()
}