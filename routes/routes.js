
import express from "express";

import { 
  getProveedor,
  getProveedorId,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} from "../controllers/prov.js";

import {
  getUser,
  getUserId,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/user.js";

import { isUserAuthenticated  } from "../middlewares/auth.js";

const router = express.Router();

router.get( "/proveedor", isUserAuthenticated, getProveedor ); //ruta traer todos

router.get("/proveedor/:id", isUserAuthenticated, getProveedorId); // ruta por id

router.post("/proveedor", isUserAuthenticated, createProveedor); //crear proveedor

router.put("/proveedor/:id", isUserAuthenticated, updateProveedor);//actualizar

router.delete("/proveedor/:id", isUserAuthenticated, deleteProveedor);//borrar



router.get( "/user", isUserAuthenticated, getUser ); //ruta traer todos

router.get("/user/:id", isUserAuthenticated, getUserId); // ruta por id

router.post("/user", isUserAuthenticated, createUser); //crear usuario

router.put("/user/:id", isUserAuthenticated, updateUser);//actualizar

router.delete("/user/:id", isUserAuthenticated, deleteUser);//borrar

export default router;