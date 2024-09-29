module.exports = {
    secret: process.env.JWT_SECRET || "default-secret-key", // ใช้ค่าจาก .env หรือค่าพื้นฐาน
};
