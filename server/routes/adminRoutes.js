const express = require("express");
const router = express.Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// LOGIN / VERIFY ADMIN
router.post("/verify", (req, res) => {
    const { password } = req.body;

    if (password === ADMIN_PASSWORD) {
        return res.json({
            success: true,
            message: "Admin verified"
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid password"
    });
});

module.exports = router;