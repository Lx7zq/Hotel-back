const Room = require('../models/Room.model'); // นำเข้าโมเดล Room

// สร้างห้องพักใหม่
exports.createRoom = async (req, res) => {
  console.log(req.body);
  const { roomNumber, roomType, roomStatus, pricePerNight, roomSize, additionalDetails, ImageUrl } = req.body;

  // ตรวจสอบข้อมูล
  if (!roomNumber || !roomType || !roomStatus || !pricePerNight || !roomSize) {
    return res.status(400).json({ message: "All fields except additionalDetails and ImageUrl are required!" });
  }

  try {
    // ตรวจสอบว่าห้องพักมีอยู่แล้วหรือไม่
    const existingRoom = await Room.findOne({ where: { roomNumber: roomNumber } });
    if (existingRoom) {
      return res.status(400).json({ message: "Room with this number already exists!" });
    }

    // สร้างห้องพักใหม่
    const newRoom = await Room.create({
      roomNumber,
      roomType,
      roomStatus,
      pricePerNight,
      roomSize,
      additionalDetails,
      ImageUrl
    });
    res.status(201).json(newRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Error creating room", error: error.message });
  }
};

// ดึงข้อมูลห้องพักทั้งหมด
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving rooms", error });
  }
};

// ดึงข้อมูลห้องพักโดยใช้ ID
exports.getRoomById = async (req, res) => {
  const id = req.params.id;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      res.status(404).json({ message: "Room not found with id " + id });
    } else {
      res.status(200).json(room);
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving room", error });
  }
};

// ปรับปรุงข้อมูลห้องพักที่มีอยู่
exports.updateRoom = async (req, res) => {
  const id = req.params.id;
  try {
    const [updated] = await Room.update(req.body, {
      where: { id: id },
    });
    if (updated) {
      const updatedRoom = await Room.findByPk(id);
      res.status(200).json(updatedRoom);
    } else {
      res.status(404).json({ message: "Room not found with id " + id });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating room", error });
  }
};

// ลบห้องพัก
exports.deleteRoom = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Room.destroy({
      where: { id: id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Room not found with id " + id });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting room", error });
  }
};
