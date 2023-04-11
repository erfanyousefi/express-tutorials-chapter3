const crypto = require("crypto");
const secret = crypto.randomBytes(16).toString("hex")
const hash = crypto.createHmac("sha512", secret).update("nodejs").digest("hex");
console.log(hash);