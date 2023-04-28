import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Tickets from "./TicketModel.js";

const { DataTypes } = Sequelize;

const CorrectiveSites = db.define('corrective_site', {
        image: {
            type: DataTypes.STRING
        },
        type_image: {
            type: DataTypes.ENUM("BEFORE", "PROGRESS", "AFTER")
        },
        notes: {
            type: DataTypes.TEXT
        },
        submit_by: {
            type: DataTypes.INTEGER
        },
        submit_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        ticket_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,

            }
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    })
    // Regionals.hasMany(Clusters, { as: 'cluster', foreignKey: 'regional_id' })
CorrectiveSites.belongsTo(Tickets, { as: 'regional', foreignKey: 'ticket_id' })
export default CorrectiveSites