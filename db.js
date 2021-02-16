var mongoose = require('mongoose');
var chalk = require('chalk')

var dbURI = process.env.DB_STRING || 'mongodb://<username>:<password>@ds019698.mlab.com:19698/employee_directory';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', function () {
    console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error', function (err) {
    console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
    console.log(chalk.red('Mongoose disconnected'));
});

var momentSchema = new mongoose.Schema({
    title: { type: String, unique: true },
    tags: { type: String },
    image: { type: String },
    createdDate: { type: Date },
    createdBy: { type: String },
});


mongoose.model('Moment', momentSchema);

var UserSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    mobile: { type: Date },
    email: { type: String, unique: true },
    city: { type: String },
    password: { type: String },
    createdDate: { type: Date }
});


mongoose.model('User', UserSchema);
