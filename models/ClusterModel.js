import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Regionals from "./RegionalModel.js";

const { DataTypes } = Sequelize;

const Clusters = db.define('mr_cluster', {
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
        regional_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,

            }
        },
        flag: {
            type: DataTypes.BOOLEAN
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    // Regionals.hasMany(Clusters, { as: 'cluster', foreignKey: 'regional_id' })
Clusters.belongsTo(Regionals, { as: 'regional', foreignKey: 'regional_id' })
export default Clusters