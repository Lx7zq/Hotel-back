const sequelize = require("./db");
const Sequelize = require("sequelize");
const User = require("./user.model");
const Role = require("./role.model");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;

// กำหนดความสัมพันธ์แบบ Many-to-Many ระหว่าง User และ Role
db.User.belongsToMany(db.Role, {
    through: "user_roles", // ชื่อตารางกลาง
    foreignKey: "userId", // ชื่อ foreignKey ที่ชี้ไปยัง User
    otherKey: "roleId" // ชื่อ foreignKey ที่ชี้ไปยัง Role
});

db.Role.belongsToMany(db.User, {
    through: "user_roles", // ชื่อตารางกลาง
    foreignKey: "roleId", // ชื่อ foreignKey ที่ชี้ไปยัง Role
    otherKey: "userId" // ชื่อ foreignKey ที่ชี้ไปยัง User
});

module.exports = db;
