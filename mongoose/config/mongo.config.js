const {default: mongoose} = require("mongoose");
const DB_URL = "mongodb://localhost:27017/mongoose-tutorial";
mongoose.set("strictQuery", true)
mongoose.connect(DB_URL, (err) => {
    console.log(err ? err.message : "server connected to mongodb");
});