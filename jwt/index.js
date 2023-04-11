const jwt = require("jsonwebtoken");
const fs = require("fs")
const privateKey = fs.readFileSync("privateKey.key")
const Secret = "6f9b9af3cd6e8b8a73c2cdced37fe9f59226e27d"
const token = jwt.sign({
        id: "some_hash_id",
        email: "emai@gmail.com"
    },
    Secret, {
        expiresIn: 1000 * 60 * 60 * 24 * 30, //20s-3d-1y
        algorithm: "HS512",
    }
);
console.log(token);
const token1 = jwt.sign({
        id: "some_hash_id",
        email: "emai@gmail.com"
    },
    privateKey, {
        expiresIn: 1000 * 60 * 60 * 24 * 30, //20s-3d-1y
        algorithm: "RS256",
    }
);
console.log(token1);
