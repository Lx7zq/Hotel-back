const { DataTypes } = require('sequelize');
const sequelize = require("./db");
const Room = require('./Room.model'); // เชื่อมต่อกับโมเดล Room

const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending', // หรือ confirmed, cancelled
    },
    guestCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

// ความสัมพันธ์: การจองต้องเกี่ยวกับห้องพัก
Booking.belongsTo(Room, { foreignKey: 'roomId' });
Room.hasMany(Booking, { foreignKey: 'roomId' });

module.exports = Booking;
