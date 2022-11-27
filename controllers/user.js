import User from "../models/user.js";

//ruta get que traiga todo losusuarios
export const getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (err) {
    console.log(err);
  }
}

//get proveedor por id
export const getUserId = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send({
        message: `no user found with id ${req.params.id}`
      });
    }
    res.send(user);
  } catch (err) {
    console.log(err);
  }  
}

//crear proveedor (ruta post)
export const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.json({
      "message": "Usuario creado",
    });
  } catch (err) {
    console.log(err);
  }
}

//actualizar modificar
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send({
        message: `no user found with id ${req.params.id}`
      });
      return;
    }
    await User.update(req.body, {
      where: {
        id:req.params.id
      }
    });
    res.json({
      "message": "user Updated"
    });
  } catch (err) {
    console.log(err)
  }
}
//borrar por id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send({
        message: `no user found with id ${req.params.id}`
      });
      return;
    }
    await User.destroy({
      where: {
        id: req.params.id
      }
    });
    res.json({
      "message": "User deleted"
    });
  } catch (err) {
    console.log(err);
  }
} 
