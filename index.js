const express = require('express');
const port = 8080;
// path is needed whenever we need set directory setup
const path = require('path');

// To get all the functionality of express 
const app = express();
// first tell to express ejs is my view engine
app.set('view engine','ejs'); // app{view engine:'ejs'} app have many properties it will include view engine
// setup the views folder MVC-> V-view
app.set('views',path.join(__dirname,'views'));

// send res or add checkpoint
app.get('/',function(req,res){
    // res.send('Cool, it is running!');
    return res.render('index');
})

app.listen(port,function(err){
    if(err){
        console.log('Error while Listening',err);
     
        return;
    }
    console.log('server is up on port number:',port);
    return;
})