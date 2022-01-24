const { DataTypes } = require("sequelize");
const db = require("../db");

const Notes = db.define("notes", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    priority: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Notes;