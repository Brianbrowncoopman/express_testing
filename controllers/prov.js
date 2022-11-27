import ProveedorDB from "../models/proveedor.js";

//ruta get que traiga todo los proveedores
export const getProveedor = async (req, res) => {
  try {
    const proveedor = await ProveedorDB.findAll();
    res.send(proveedor);
  } catch (err) {
    console.log(err);
  }
}

//get proveedor por id
export const getProveedorId = async (req, res) => {
  try {
    const proveedor = await ProveedorDB.findByPk(req.params.id);
    if (!proveedor) {
      res.status(404).send({
        message: `no proveedor found with id ${req.params.id}`
      });
    }
    res.send(proveedor);
  } catch (err) {
    console.log(err);
  }  
}

//crear proveedor (ruta post)
export const createProveedor = async (req, res) => {
  try {
    await ProveedorDB.create(req.body);
    res.json({
      "message": "Proveedor creado",
    });
  } catch (err) {
    console.log(err);
  }
}

//actualizar modificar
export const updateProveedor = async (req, res) => {
  try {
    const proveedor = await ProveedorDB.findByPk(req.params.id);
    if (!proveedor) {
      res.status(404).send({
        message: `no proveedor found with id ${req.params.id}`
      });
      return;
    }
    await ProveedorDB.update(req.body, {
      where: {
        id:req.params.id
      }
    });
    res.json({
      "message": "proveedor Updated"
    });
  } catch (err) {
    console.log(err)
  }
}
//borrar por id
export const deleteProveedor = async (req, res) => {
  try {
    const proveedor = await ProveedorDB.findByPk(req.params.id);
    if (!proveedor) {
      res.status(404).send({
        message: `no proveedor found with id ${req.params.id}`
      });
      return;
    }
    await ProveedorDB.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      "message": "Proveedor deleted"
    });
  } catch (err) {
    console.log(err);
  }
} 
