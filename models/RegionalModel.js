import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Regionals = db.define('mr_regional', {
    name: {
        type: DataTypes.STRING
    },
    flag: {
        type: DataTypes.BOOLEAN
    },
}, {
    freezeTableName: true,
    timestamps: false,
})

export default Regionals