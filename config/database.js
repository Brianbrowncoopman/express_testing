import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,//nombre db  //nombre de base de dato //variable de entorno
  process.env.DB_USER, //usuario 
  process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    port: 5432,
    define: {
      timestamps: false
    }
});  

export default db; 

