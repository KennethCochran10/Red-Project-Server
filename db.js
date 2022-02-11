const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || `postgresql://${process.env.DATABASE_USERNAME}:${encodeURIComponent(process.env.DATABASE_PASSWORD)}@localhost/${process.env.DATABASE_NAME}`, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }

})
module.exports = sequelize;