import { Sequelize } from "sequelize";
import db from "../config/database.js"; ///importar la coneccion


const { DataTypes } = Sequelize;

const ProveedorDB = db.define('proveedor', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER
    },
    company: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    createdOn: {
      type: DataTypes.DATE,
      field: 'created_on',
      defaultValue: Sequelize.NOW
    }},{
      tableName: 'proveedor'
  });

export default ProveedorDB;  