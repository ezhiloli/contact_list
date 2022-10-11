const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/contact_list_db');

const db = mongoose.connection;

db.on('error',function(err){console.log('error connecting to db',err);});

db.once('open',function(){
    console.log('successfully connected to database :: MongoDB')
})