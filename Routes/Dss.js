const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// Tạo chữ ký số
router.get('/', (req, res) => {
    res.render('index');
});

router.post('/sign', (req, res) => {
    const { message, privateKey } = req.body;

    // Tạo chữ ký
    const signer = crypto.createSign('SHA256');
    signer.update(message);
    signer.end();

    const signature = signer.sign(privateKey, 'hex');
    res.render('index', { message, signature });
});

// Xác minh chữ ký
router.post('/verify', (req, res) => {
    const { message, signature, publicKey } = req.body;

    const verifier = crypto.createVerify('SHA256');
    verifier.update(message);
    verifier.end();

    const isValid = verifier.verify(publicKey, signature, 'hex');
    res.render('verify', { message, signature, publicKey, isValid });
});

module.exports = router;
