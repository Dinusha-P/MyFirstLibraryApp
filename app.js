const express = require('express');
const mongoose = require('mongoose');
const BookData = require('./src/model/Bookdata');
const UserData = require('./src/model/Userdata');
const cors = require('cors');

//var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken')
var app = new express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

const path = require('path');
app.use(express.static('./dist/front-end'));
//app.use(bodyparser.json());
//username='admin';
//password='1234';
//
//
//function verifyToken(req, res, next) {
//    if(!req.headers.authorization) {
//      return res.status(401).send('Unauthorized request')
//    }
//    let token = req.headers.authorization.split(' ')[1]
//    if(token === 'null') {
//      return res.status(401).send('Unauthorized request')    
//    }
//    let payload = jwt.verify(token, 'secretKey')
//    if(!payload) {
//      return res.status(401).send('Unauthorized request')    
//    }
//    req.userId = payload.subject
//    next()
//  }
//
app.post('/api/insert',/*verifyToken,*/function(req,res){
   
    console.log(req.body);
   
    var book = {       
        bookId : req.body.book.bookId,
        bookName : req.body.book.bookName,
        Author : req.body.book.Author,
        description : req.body.book.description,
        imageUrl : req.body.book.imageUrl,
   }       
   var book = new BookData(book);
   book.save();
});
app.post('/api/signup',function(req,res){
   
  console.log(req.body);
 
  var user = {       
      username : req.body.user.username,
      password : req.body.user.password,
 }       
 var user = new UserData(user);
 user.save();
});
app.get('/api/books',function(req,res){
    
    BookData.find()
                .then(function(books){
                    res.send(books);
                });
});
app.get('/api/:id',  (req, res) => {
  
  const id = req.params.id;
    BookData.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})

app.post('/api/login', (req, res) => {
   let userData1 = req.body
   UserData.findOne({"username":userData1.username,"password":userData1.password}).then((data)=>{
    console.log(data)
    if (data===null) {
      res.status(401).send('Invalid Username and password!!')
    } else if(data.username===userData1.username && data.password===userData1.password){
      let payload = {subject: userData1.username+userData1.password}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
    else{
      res.status(401).send('Invalid Username and password!!')
    }
  });
   
})

    app.put('/api/update',(req,res)=>{
      console.log(req.body)
      id=req.body._id,
      bookId= req.body.bookId,
      bookName = req.body.bookName,
      Author = req.body.Author,
      description = req.body.description,
      imageUrl = req.body.imageUrl
     BookData.findByIdAndUpdate({"_id":id},
                                  {$set:{"bookId":bookId,
                                  "bookName":bookName,
                                  "Author":Author,
                                  "description":description,
                                  "imageUrl":imageUrl}})
     .then(function(){
         res.send();
     })
   })
   
app.delete('/api/remove/:id',(req,res)=>{
   
     id = req.params.id;
     BookData.findByIdAndDelete({"_id":id})
     .then(()=>{
         console.log('success')
         res.send();
     })
   })
  
app.get('/*', function (req,res){
  res.sendFile(path.join(__dirname + '/dist/front-end/index.html'));
})
   
// For Heroku  
const PORT = (process.env.PORT || 5000);
app.listen(PORT, function(){
    console.log('listening to port 5000');
});

