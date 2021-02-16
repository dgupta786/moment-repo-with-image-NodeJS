require("dotenv").config()
const express = require("express")
const app = express()
const fs = require("fs")
var morgan = require('morgan')
const path = require('path')
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoDb = require("./db")
const routers = require("./route")
const port = process.env.PORT || 8000

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png')
    }
})

var upload = multer({ storage: storage });



let options = {
    origin: "*"
};

app.use(cors(options));
app.use(bodyParser.json({
    limit: "50mb"
}));
app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: true
}));

app.use(express.static(__dirname + '/public'));

//Access Logger
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(morgan('combined', { stream: accessLogStream }))

app.get("/", (req, res) => {
   res.send("Hello World !!!")
});


app.get('/users', routers.users)

app.get('/monents', routers.moments)

app.get('/getUser', routers.getUser)

app.get('/getMomentById', routers.getMomentById)

app.get('/getMomentByUser', routers.getMomentByUser)

app.post('/addUser', routers.addUser)

app.post('/addMoment', upload.any('image'), routers.addMoment)

app.post('/login', routers.loginUser)

app.get('/deleteMoment', routers.deleteMoment)

app.get('/deleteAllUser', routers.deleteAllUser)

app.get('/deleteAllMoment', routers.deleteAllMoment)

app.post('/updateMoment', upload.any('image'), routers.updateMoment)

app.get('/downloadImage', routers.downloadImage)




app.listen(port, () => {
    console.log(`Employee Directory application is running on http://localhost:${port}`)
})
