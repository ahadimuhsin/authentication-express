import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Regionals from "./RegionalModel.js";
import Teams from "./TeamModel.js";

const { DataTypes } = Sequelize;

const Sites = db.define('mr_site', {
        name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        latitude: {
            type: DataTypes.STRING
        },
        longitude: {
            type: DataTypes.STRING
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,

            }
        },
        flag: {
            type: DataTypes.BOOLEAN
        },
        pic_owner: {
            type: DataTypes.STRING
        },
        contact_person: {
            type: DataTypes.STRING
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    // Regionals.hasMany(Clusters, { as: 'cluster', foreignKey: 'regional_id' })
Sites.belongsTo(Teams, { as: 'team', foreignKey: 'team_id' })
export default Sites