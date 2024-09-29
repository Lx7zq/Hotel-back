const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Role = sequelize.define("Role", { // ใช้ชื่อพิมพ์ใหญ่
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = Role;
