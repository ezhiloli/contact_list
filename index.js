const express = require('express');
const port = 8080;

// To get all the functionality of express 
const app = express();



app.listen(port,function(err){
    if(err){
        console.log('Error while Listening',err);
        return;
    }
    console.log('server is up on port number:',port);
    return;
})