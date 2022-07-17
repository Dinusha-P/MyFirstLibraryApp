const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/Products');
mongoose.connect(`mongodb+srv://dinusha:dinusha12345@cluster0.apqzh.mongodb.net/Library?retryWrites=true&w=majority`);
const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    bookId : Number,
    bookName : String,
    Author : String,
    description : String,
    imageUrl : String 
});

var Bookdata = mongoose.model('book', NewBookSchema);   
//Bookdata is the model and NewBookData is the schema

module.exports = Bookdata;