import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('mr_user_mobile', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: {
            args: true,
            msg: 'Email Sudah Ada'
        }
    },
    password: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
    photo_profile: {
        type: DataTypes.STRING
    },
    remember_token: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.STRING
    },
    team_id: {
        type: DataTypes.INTEGER,
    },
    site_id: {
        type: DataTypes.INTEGER,
    },
    flag: {
        type: DataTypes.BOOLEAN
    },
    created_by: {
        type: DataTypes.INTEGER,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
            // This way, the current date/time will be used to populate this column (at the moment of insertion)
    },
    last_login_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
            // This way, the current date/time will be used to populate this column (at the moment of insertion)
    }
}, {
    freezeTableName: true,
    timestamps: false,
})

export default Users