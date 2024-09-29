const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Room = sequelize.define("room", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  roomNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roomType: {
    type: DataTypes.STRING, // เปลี่ยนจาก ENUM เป็น STRING
    allowNull: false,
  },
  roomStatus: {
    type: DataTypes.STRING, // เปลี่ยนจาก ENUM เป็น STRING
    allowNull: false,
  },
  pricePerNight: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0, // ค่าตั้งต้น
    validate: {
      isFloat: { msg: "Price must be a number" },
      min: { args: [0], msg: "Price must be greater than or equal to 0" }
    }
  },
  roomSize: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.0, // ค่าตั้งต้น
  },
  additionalDetails: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ImageUrl: {
    type: DataTypes.STRING,
    allowNull: true, // เปลี่ยนเป็น false ถ้าต้องการให้เป็นฟิลด์ที่จำเป็น
  },
});

// ใช้ sync({ alter: true }) เพื่อปรับปรุงตาราง
Room.sync({ alter: true })
  .then(() => {
    console.log("Room table created or updated");
  })
  .catch((error) => {
    console.log("Error creating or updating Room table:", error);
  });

module.exports = Room;
