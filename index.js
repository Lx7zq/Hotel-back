const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const roomRoutes = require("./routers/Room.router");
const bookingRoutes = require("./routers/Booking.router");// เปลี่ยนจาก reservationRoutes เป็น bookingRoutes
const authRouter = require("./routers/auth.router");
const db = require('./models');
const role = db.Role;
const cors = require("cors");

const corsOption = {
    origin: ['https://hotel-font.vercel.app', 'http://localhost:5173'], // อนุญาตหลาย origin
    credentials: true, // หากใช้ cookies หรือ tokens
};

// เชื่อมต่อฐานข้อมูลและซิงค์โมเดล
// db.sequelize.sync({ alter: true })
//     .then(() => {
//         console.log("Database synchronized");
//         initRole(); // เรียกใช้ฟังก์ชันเพื่อสร้างบทบาท
//     })
//     .catch(err => {
//         console.error("Error syncing database:", err);
//     });

// ฟังก์ชันเพื่อสร้าง Role (ในกรณีที่ยังไม่มี)
const initRole = async () => {
    try {
        await role.findOrCreate({ where: { id: 1, name: "user" } });
        await role.findOrCreate({ where: { id: 2, name: "moderator" } });
        await role.findOrCreate({ where: { id: 3, name: "admin" } });
        console.log("Roles initialized");
    } catch (error) {
        console.error("Error initializing roles:", error);
    }
};

// ใช้ middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption)); // เปิดใช้งาน CORS

// ใช้ router
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes); // ใช้เส้นทาง bookings
app.use('/api/auth', authRouter); // เพิ่ม auth router สำหรับการจัดการการล็อกอิน

// Route พื้นฐาน
app.get("/", (req, res) => {
    res.send("<h1>Hello hotel API</h1>");
});

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log("Listening to http://localhost:" + PORT);
});
