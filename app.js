const express = require("express");
// const { fstat } = require("fs");
// const fs=require("fs");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser= require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true,useUnifiedTopology:true});
const port = 80;
// Express specific stuff
// Define mongoose schema 
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  var Contact = mongoose.model('Contact', contactSchema);
 
app.use('/static', express.static('static')) // for sevicing static files
app.use(express.urlencoded())

// pug specific stuff

app.set('view engine', 'pug') //set the template engine an pug

app.set('views', path.join(__dirname, 'views')) //set the view directory
// our pug demo endpoint
app.get('/', (req, res) => {
   
    const params = { }
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res) => {
   
    const params = { }
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res) => {
   
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(404).send("Item was not saved to the data base")
    });

    // res.status(200).render('contact.pug');
});
//start the server
app.listen(port, () => {
    console.log(`The application started Successfully on port ${port}`);
})
