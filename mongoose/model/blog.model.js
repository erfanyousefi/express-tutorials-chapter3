const { Schema, model } = require("mongoose");
const BlogSchema = new Schema({
    title: {type: String, required: true, trim: true, minLength: 5},
    text: {type: String, required: true, trim: true, minLength: 5},
    show: {type: Boolean, default: false, },
    likes: {type: Number, default: 0},
    bookmarks: {type: [String], default: []},
}, {
    timestamps: true
})
const BlogModel = model("blog", BlogSchema);
module.exports = {
    BlogModel
}