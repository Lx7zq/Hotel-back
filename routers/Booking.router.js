const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/Booking.Controller');

// สร้างการจองใหม่
router.post('/', bookingController.createBooking);

// ดึงข้อมูลการจองทั้งหมด
router.get('/', bookingController.getAllBookings);

// ดึงข้อมูลการจองโดยใช้ ID
router.get('/:id', bookingController.getBookingById);

// ปรับปรุงการจอง
router.put('/:id', bookingController.updateBooking);

// ลบการจอง
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
