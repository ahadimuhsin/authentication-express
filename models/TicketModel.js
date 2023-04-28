import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Regionals from "./RegionalModel.js";
import Menus from "./MenuModel.js";
import Sites from "./SiteModel.js";

const { DataTypes } = Sequelize;

const Tickets = db.define('ticket_history', {
        ticket_number: {
            type: DataTypes.STRING
        },
        ticket_description: {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.STRING
        },
        longitude: {
            type: DataTypes.STRING
        },
        solve_by: {
            type: DataTypes.INTEGER
        },
        solve_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        created_by: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        site_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,

            }
        },
        category: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,

            }
        },
        flag: {
            type: DataTypes.BOOLEAN
        },
        ticket_subject: {
            type: DataTypes.TEXT('tiny')
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    // Regionals.hasMany(Clusters, { as: 'cluster', foreignKey: 'regional_id' })
Tickets.belongsTo(Menus, { as: 'category_menu', foreignKey: 'category' })
Tickets.belongsTo(Sites, { as: 'site', foreignKey: 'site_id' })
export default Tickets