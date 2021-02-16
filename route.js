var mongoose = require('mongoose');
var User = mongoose.model('User');
var Moment = mongoose.model('Moment');



exports.users = function (req, res) {
    User.find({}, function (err, users) {
        if (!err) {
            res.json({ code: 0, data: users })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while retriving user data" })
        }
    });
}

exports.moments = function (req, res) {
    Moment.find({}, function (err, moments) {
        if (!err) {
            res.json({ code: 0, data: moments })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while retriving moment data" })
        }
    });
}

exports.addUser = function (req, res) {

    console.log("add User :", req.body)

    var newUser = new User();

    newUser.firstName = req.body.firstName
    newUser.lastName = req.body.lastName
    newUser.mobile = req.body.mobile
    newUser.email = req.body.email
    newUser.city = req.body.city
    newUser.password = req.body.password
    newUser.createdDate = new Date()
    newUser.save(function (err, savedUser) {
        if (err) {
            console.log("Error : While saving the User Data", err.code);
            if (err.code == 11000) {
                res.json({ code: 1, message: "Duplicate entry not allowed" })
            }
            else {
                res.json({ code: 1, message: "Error while saving the user data" })
            }
        } else {
            res.json({ code: 0, data: savedUser, message: "User data added successfully" })
        }
    });
}

exports.addMoment = function (req, res) {

    console.log("add Moment :", req.body)

    var newMoment = new Moment();

    newMoment.title = req.body.title
    newMoment.tags = req.body.tags
    newMoment.image = req.files[0].filename
    newMoment.createdBy = req.body.createdBy
    newMoment.createdDate = new Date()


    newMoment.save(function (err, savedMoment) {
        if (err) {
            console.log("Error : While saving the Moment Data", err);
            if (err.code == 11000) {
                res.json({ code: 1, message: "Duplicate entry not allowed" })
            }
            else {
                res.json({ code: 1, message: "Error while saving the Moment data" })
            }
        } else {
            res.json({ code: 0, data: savedMoment, message: "Moment data added successfully" })
        }
    });
}

exports.getUser = function (req, res) {
    var id = req.params.id;
    User.findOne({ _id: id }, function (err, user) {
        if (!err) {
            res.json({ code: 0, data: user })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while retriving user data" })
        }
    });
}

exports.getMomentById = function (req, res) {
    var id = req.query.id;
    Moment.findOne({ _id: id }, function (err, moment) {
        if (!err) {
            res.json({ code: 0, data: moment })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while retriving moment data" })
        }
    });
}

exports.getMomentByUser = function (req, res) {
    var id = req.query.id;
    Moment.find({ createdBy: id }, function (err, moment) {
        if (!err) {
            res.json({ code: 0, data: moment })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while retriving moment data" })
        }
    });
}

exports.loginUser = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({ email: email }, function (err, user) {
        console.log("User :", user)
        if (!err && user) {
            if (user.password == password) {
                res.json({ code: 0, data: user })
            } else {
                res.json({ code: 1, message: "Error while login. Check your credentials" })
            }
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while login. Check your credentials" })
        }
    });
}

exports.deleteMoment = function (req, res) {
    var id = req.query.id;
    Moment.findOneAndDelete({ _id: id }, function (err, data) {
        if (!err) {
            res.json({ code: 0, data: data, message: "Moment data deleted" })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while deleting moment data" })
        }
    });
}

exports.deleteAllUser = function (req, res) {
    var id = req.params.id;
    User.deleteMany({}, function (err, data) {
        if (!err) {
            res.json({ code: 0, data: data, message: "All user deleted" })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while deleting all user data" })
        }
    });
}

exports.deleteAllMoment = function (req, res) {
    var id = req.params.id;
    Moment.deleteMany({}, function (err, data) {
        if (!err) {
            res.json({ code: 0, data: data, message: "All moment deleted" })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while deleting all moment data" })
        }
    });
}

exports.updateMoment = function (req, res) {
    var id = req.body._id;
    delete req.body._id
    req.body.image = (req.files[0]) ? req.files[0].filename : req.body.image


    console.log(id)
    Moment.findOneAndUpdate({ _id: id }, req.body, { useFindAndModify: false }, function (err, data) {
        if (!err) {
            res.json({ code: 0, data: data, message: "Moment data updated" })
        } else {
            console.error(err)
            res.json({ code: 1, message: "Error while updating moment data" })
        }
    });
}

exports.downloadImage = function (req, res) {
    var id = req.query.id
    res.download(`${__dirname}/uploads/` + id);
}
