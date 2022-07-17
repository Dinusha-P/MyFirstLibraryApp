const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Products');
mongoose.connect(`mongodb+srv://dinusha:dinusha12345@cluster0.apqzh.mongodb.net/Library?retryWrites=true&w=majority`);
const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    username: String,
    password:String
});

var Userdata = mongoose.model('user', NewUserSchema);   
//Usedata is the model and NewUserData is the schema

module.exports = Userdata;