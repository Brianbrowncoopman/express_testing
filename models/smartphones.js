import { Sequelize } from "sequelize";
import db from "../config/database"; ///importar la coneccion
import ProveedorDB from "./proveedor.js";


const { DataTypes } = Sequelize;

const Smartphone = db.define('proveedor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
    references: {
      model: ProveedorDB,
      key: 'company_id'
    }
  },
  name: {
    type: DataTypes.STRING
  },
  color: {
    type: DataTypes.STRING
  },
  size : {
    type: DataTypes.STRING
  },
  company: {
    type: DataTypes.STRING
  },
  createdOn: {
    type: DataTypes.DAte,
    defaultValue: Sequelize.NOW,
    field: 'created_on'
  }},{
    tableName: 'smartphones'
  });

export default Smartphone;
