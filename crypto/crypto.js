// Hàm băm SHA-256, kích thước khối đầu vào 512bits, đầu ra 256bits
function sha256(message) {
  //Khởi tạo các giá trị ban đầu
    const H = [
        0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
        0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];

    // Hàm phụ trợ (ch, maj, sigma)
    function ROTR(n, x) {
        return (x >>> n) | (x << (32 - n));
    }
  
    function CH(x, y, z) {
        return (x & y) ^ (~x & z);
    }
    function MAJ(x, y, z) {
        return (x & y) ^ (x & z) ^ (y & z);
    }
    function SIGMA0(x) {
        return ROTR(2, x) ^ ROTR(13, x) ^ ROTR(22, x);
    }
    function SIGMA1(x) {
        return ROTR(6, x) ^ ROTR(11, x) ^ ROTR(25, x);
    }
    function sigma0(x) {
        return ROTR(7, x) ^ ROTR(18, x) ^ (x >>> 3);
    }
    function sigma1(x) {
        return ROTR(17, x) ^ ROTR(19, x) ^ (x >>> 10);
    }

    // Xử lý từng khối (giả lập)
    function processBlock(block) {
        const W = new Array(64);
        for (let t = 0; t < 64; t++) {
            if (t < 16) {
                W[t] = block[t];
            } else {
                W[t] = (sigma1(W[t - 2]) + W[t - 7] + sigma0(W[t - 15]) + W[t - 16]) >>> 0;
            }
        }

        let [a, b, c, d, e, f, g, h] = H;

        for (let t = 0; t < 64; t++) {
            const T1 = (h + SIGMA1(e) + CH(e, f, g) + K[t] + W[t]) >>> 0;
            const T2 = (SIGMA0(a) + MAJ(a, b, c)) >>> 0;
            h = g;
            g = f;
            f = e;
            e = (d + T1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (T1 + T2) >>> 0;
        }

        H[0] = (H[0] + a) >>> 0;
        H[1] = (H[1] + b) >>> 0;
        H[2] = (H[2] + c) >>> 0;
        H[3] = (H[3] + d) >>> 0;
        H[4] = (H[4] + e) >>> 0;
        H[5] = (H[5] + f) >>> 0;
        H[6] = (H[6] + g) >>> 0;
        H[7] = (H[7] + h) >>> 0;
    }

    // Xử lý thông điệp (giả lập)
    function preprocess(message) {
        // Hàm chuyển đổi thông điệp sang 512-bit block...
        return [];
    }

    const blocks = preprocess(message);
    for (const block of blocks) {
        processBlock(block);
    }

    return H.map(h => h.toString(16).padStart(8, "0")).join("");// duyệt qua từng phần tử, chuyển h thành hệ thập lục phân(16), tự động lấp đầy với mỗi bit trống bằng bit 0 sao cho đủ 8 kí tự
  //nối lại các chuỗi thành 1 đoạn.
}


// Hàm RSA
function modExp(base, exp, mod) {
    let result = 1n;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2n === 1n) {
            result = (result * base) % mod;
        }
        exp = exp / 2n;
        base = (base * base) % mod;
    }
    return result;
}

function rsaEncrypt(message, e, n) {
    const m = BigInt("0x" + Buffer.from(message).toString("hex"));
    return modExp(m, e, n);
}

function rsaDecrypt(ciphertext, d, n) {
    return modExp(ciphertext, d, n);
}

// Tạo chữ ký số
function signMessage(message, privateKey) {
    const hash = sha256(message);
    const signature = rsaEncrypt(hash, privateKey.d, privateKey.n);
    return signature.toString(16); // Chuyển thành chuỗi hex
}

// Xác minh chữ ký
function verifyMessage(message, signature, publicKey) {
    const hash = sha256(message);
    const decryptedHash = rsaDecrypt(BigInt("0x" + signature), publicKey.e, publicKey.n);
    return hash === decryptedHash.toString(16);
}

module.exports = {
    sha256,
    rsaEncrypt,
    rsaDecrypt,
    signMessage,
    verifyMessage
};
