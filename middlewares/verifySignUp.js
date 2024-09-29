const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");

// ตรวจสอบการลงทะเบียนชื่อผู้ใช้และอีเมลซ้ำ
const checkDuplicateUserNameOrEmail = async (req, res, next) => {
    try {
        // ตรวจสอบชื่อผู้ใช้
        let user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (user) {
            return res.status(400).send({ message: "Failed! Username is already in use" });
        }

        // ตรวจสอบอีเมล
        user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (user) {
            return res.status(400).send({ message: "Failed! Email is already in use" });
        }

        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// ตรวจสอบบทบาทที่มีอยู่
const checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        try {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });

            // ตรวจสอบว่าบทบาททั้งหมดที่ส่งมานั้นมีอยู่ในฐานข้อมูลหรือไม่
            if (roles.length !== req.body.roles.length) {
                return res.status(400).send({ message: "Failed! One or more roles do not exist" });
            }

            next();
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    } else {
        next();
    }
};

const verifySignUp = {
    checkDuplicateUserNameOrEmail,
    checkRolesExisted,
};

module.exports = verifySignUp;
