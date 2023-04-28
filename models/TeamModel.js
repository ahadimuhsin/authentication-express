import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Clusters from "./ClusterModel.js";

const { DataTypes } = Sequelize;

const Teams = db.define('mr_team', {
        name: {
            type: DataTypes.STRING
        },
        cluster_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,

            }
        },
        flag: {
            type: DataTypes.BOOLEAN
        },
        created_by: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    // Regionals.hasMany(Clusters, { as: 'cluster', foreignKey: 'regional_id' })
Teams.belongsTo(Clusters, { as: 'cluster', foreignKey: 'cluster_id' })
export default Teams