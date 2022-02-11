const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://${process.env.DATABASE_USERNAME}:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@localhost/${process.env.DATABASE_NAME}`, {
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'production'
})
module.exports = sequelize;