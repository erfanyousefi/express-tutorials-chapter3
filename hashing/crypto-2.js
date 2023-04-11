const crypto = require("crypto");
const hash = crypto.createHash("sha512", {encoding: "utf-8"})
.update("123456").digest("hex");
console.log(hash);