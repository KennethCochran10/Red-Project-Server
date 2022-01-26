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
        allowNull: true,
    },

    title: {
        type: DataTypes.STRING,
        allowNull: true
    },

    salary: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    contactInfo: {
        type: DataTypes.INTEGER,
        allowNull: true
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