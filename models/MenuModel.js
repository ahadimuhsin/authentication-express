import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Menus = db.define('mr_menu_mobile', {
    label: {
        type: DataTypes.STRING
    },
    label_desc: {
        type: DataTypes.STRING
    },
    icon: {
        type: DataTypes.STRING
    },
    flag: {
        type: DataTypes.BOOLEAN
    },
}, {
    freezeTableName: true,
    timestamps: false,
})

export default Menus