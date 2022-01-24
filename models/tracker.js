const { DataTypes } = require("sequelize");
const db = require("../db");

const Tracker = db.define("tracker", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },


    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    salary: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    contactInfo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    haveIContacted: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },

    haveTheyContacted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    }
});

module.exports = Tracker;