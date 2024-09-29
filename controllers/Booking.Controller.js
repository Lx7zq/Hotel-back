const Booking = require('../models/Booking.model'); // นำเข้าโมเดล Booking

// สร้างการจองใหม่
exports.createBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error });
    }
};

// ดึงข้อมูลการจองทั้งหมด
exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving bookings", error });
    }
};

// ดึงข้อมูลการจองโดยใช้ ID
exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (booking) {
            res.status(200).json(booking);
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error retrieving booking", error });
    }
};

// ปรับปรุงการจอง
exports.updateBooking = async (req, res) => {
    try {
        const [updated] = await Booking.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedBooking = await Booking.findByPk(req.params.id);
            res.status(200).json(updatedBooking);
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error });
    }
};

// ลบการจอง
exports.deleteBooking = async (req, res) => {
    try {
        const deleted = await Booking.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Booking not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting booking", error });
    }
};
