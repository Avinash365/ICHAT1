const express = require("express"); 
const path = require("path"); 
const fs = require("fs"); 
const app = express(); 
const port = 80; 

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// express specific STUFF 
app.use('/static',express.static('static')) //for serving statics files 
app.use(express.urlencoded())

// PUG SPECIFIC STUFF 
app.set('view engin','pug')// set the template engine as pug
app.set('views', path.join(__dirname,'views')) //Set the views directory 

// ENDPOINTS 
app.get('/',(req,res)=>{
    // const con = "This is the best content on the internet so far so use it wisely"
    // const params = {'title': 'PubG is the best game', "content": con} 
    res.status(200).render('index.pug'); 
})  

// data base diractory...  

const contactSchema = new mongoose.Schema({
    email: String,
    password: String
  });

const Contact = mongoose.model('Contact', contactSchema);

app.post('/',(req,res)=>{
   
    console.log(req.body) 
    email = req.body.email
    password = req.body.password 

    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.send("item was not saved to the databse")}); 

    let outputToWrite = `the email of the client is ${email}, ${password} years old,`
    fs.writeFileSync('output.txt',outputToWrite)

    const params = {'message': 'Your form has been submitted successfully'}
    // res.status(200).render('index.pug', params);
}) 
// START THE SERVER 
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});  
