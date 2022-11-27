import express from "express";
import cors from 'cors';
import db from './config/database.js';
import AuthRouter from './routes/auth.js';
import Router from "./routes/routes.js";




const app = express();

app.use(express.json());

//var corsOptions = {
//  origin: 'http://example.com',
//}

app.use(cors());

//testing database conection
try {
  await db.authenticate();
  console.log('conection succestully.');
} catch (error) {
  console.error('unable to conect database:', error);
}

//use router
app.use(Router);
app.use(AuthRouter);
//app.use(AuthRouter);

app.listen(5000, () => {
  console.log('Brian ,Estamos corriendo en el puerto:5000...')
})

export default app;

