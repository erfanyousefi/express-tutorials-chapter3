const jwt = require("jsonwebtoken");
const Secret = "6f9b9af3cd6e8b8a73c2cdced37fe9f59226e27d"
const token = jwt.sign({
        id: "some_hash_id",
        email: "emai@gmail.com"
    },
    Secret, {
        expiresIn: "1s"
    }
);
console.log(token);
setTimeout(() => {
    try {
        const verifiedData = jwt.verify(token, Secret);
        console.log(verifiedData);
    } catch (error) {
        console.log(error.message);
    }
}, 3500)
setTimeout(() => {
    try {
        const decodedData = jwt.decode(token);
        console.log(decodedData);
    } catch (error) {
        console.log(error.message);
    }
}, 3500)