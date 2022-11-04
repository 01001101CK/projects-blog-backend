const express = require("express");
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const postRoute = require('./routes/posts')
const multer = require('multer')
const cors = require('cors');
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("connected to Mongo")).catch((err) => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const picturesStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'Assets');
    },
    filename: (req, file, callback) => {
        callback(null, "newPhoto.png")
    }
})

const upload = multer({ storage: picturesStorage })
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json("Picture has been uploaded")
})

app.use('/api/posts', postRoute)


app.listen('8000', function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 8000);
})