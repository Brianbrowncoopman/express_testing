import { DATE, Sequelize } from "sequelize";
import db from "../config/database.js";


const { DataTypes } = Sequelize;


const User = db.define('user', {

  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_name: {
    type: DataTypes.STRING
  },
  user_email: {
    type: DataTypes.STRING
  },
  user_password: {
    type:DataTypes.STRING
  },
  

});

export default User;