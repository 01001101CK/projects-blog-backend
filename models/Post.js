const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String,
            require: true
        },
        picture: {
            type: String,
            required: false,
        }
    }
)

module.exports = mongoose.model("Post", PostSchema);