import express from "express";
import { PORT, HOST_DB } from "./env.js";
import morgan from "morgan";
import cors from "cors";
import {
  notFoundController,
  errorController,
} from "./src/controllers/errors/index.js";
import userRoutes from "./src/routes/index.js";
import fileUpload from "express-fileupload";

// Usamos express
const app = express();

// Hacemos que express interprete los JSON
app.use(express.json());

// Usamos express-fileupload para subir archivos
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// Usamos morgan para recibir en consola las peticiones hechas
app.use(morgan("dev"));

// Usamos CORS para proteger las peticiones al servicio solamente con los http permitidos
const allowedHttp = ["http:/localhost:3030", "http:/localhost:3001"];
app.use(cors({ origin: allowedHttp }));

//Middleware llamando a las rutas
app.use(userRoutes);

//Middleware insertar experiencia

// Gestión de error 404: Not Found
app.use(notFoundController);

// Uso del middleware de errores
app.use(errorController);

// Levantamos el servicio
app.listen(PORT, () => {
  console.log(`Servidor escuchando en ${HOST_DB}:${PORT}`);
});
