const express = require('express');
const router = express.Router();
const roomController = require('../controllers/Room.Controller'); // ตรวจสอบเส้นทางให้ถูกต้อง
const { authJwt } = require("../middlewares")
// สร้างห้องพักใหม่
router.post('/', [authJwt.verifyToken, authJwt.isModOrAdmin], roomController.createRoom);

// ดึงข้อมูลห้องพักทั้งหมด
router.get('/', roomController.getAllRooms);

// ดึงข้อมูลห้องพักโดยใช้ ID
router.get('/:id', [authJwt.verifyToken], roomController.getRoomById);

// ปรับปรุงข้อมูลห้องพัก
router.put('/:id', [authJwt.verifyToken, authJwt.isModOrAdmin], roomController.updateRoom);

// ลบห้องพัก
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], roomController.deleteRoom);

module.exports = router;
