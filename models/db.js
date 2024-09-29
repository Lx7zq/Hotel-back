const { Sequelize } = require("sequelize");
const dbConfig = require("../config/db.config");

// Create a new Sequelize instance with database configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Corrected the typo here
        },
    },
});

// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

testConnection();

module.exports = sequelize;
