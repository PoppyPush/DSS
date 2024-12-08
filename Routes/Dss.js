const express = require("express");
const router = express.Router();
const { signMessage, verifyMessage } = require("../utils/crypto");

// Endpoint tạo chữ ký
router.post("/sign", (req, res) => {
    const { message, privateKey } = req.body;
    const signature = signMessage(message, privateKey);
    res.json({ signature });
});

// Endpoint xác minh chữ ký
router.post("/verify", (req, res) => {
    const { message, signature, publicKey } = req.body;
    const isValid = verifyMessage(message, signature, publicKey);
    res.json({ isValid });
});

module.exports = router;
