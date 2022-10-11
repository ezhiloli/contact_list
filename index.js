const express = require('express');
// path is needed whenever we need set directory setup
const path = require('path');
const port = 8080;

// configure the mongoose connection
const db = require('./config/mongoose');
const Contact = require('./models/contact');

// To get all the functionality of express 
const app = express();
// first tell to express ejs is my view engine
app.set('view engine','ejs'); // app{view engine:'ejs'} app have many properties it will include view engine
// setup the views folder MVC-> V-view
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
// access static files
app.use(express.static('assets'));





// create Local/Static Contact List
var contactList = [
    {
        name:'Ezhiloli',
        phone:'9380364937'
    },
    {
        name:'Stark',
        phone:'487659264',
    },
    {
        name:'Captain America',
        phone:'8363036402'
    }
]

// send res or add checkpoint
app.get('/',function(req,res){
    // res.send('Cool, it is running!');
    // Everthing in JS is Obj => locals ={ title:"My Contact List"}
    // We can Access in index file like this => locals.title

    // fetching contact
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contact from DB');
            return;
        }
        else{
            return res.render('index',{
                title:"My Contacts List",
                contact_list:contacts
            });
        }
    })

  
})
app.get('/test-page',function(req,res){
    
    return res.render('testpage');
})
app.post('/create-contact',function(req,res){

    // if(req.body.name && req.body.phone){

    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // })

    Contact.create({
        name:req.body.name,
         phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log('Error in creating Contact',err);
            return;
        }
        console.log('***************',newContact);
        return res.redirect('back');
    })

   
    // console.log(req.body);
    // console.log('Name is:',req.body.name);
    // console.log('Phone Number is:',req.body.phone);
    

    // return res.redirect('back');
/// return res.redirect('/') same as <= ;  
    // return res.redirect('test-page')
});

app.get('/delete-contact/',function(req,res){
    // 2 ways to get the data from url 1.Query Param 2. String Param
    // req.params is object
    console.log(req.query);
    let phone = req.query.phone;

    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if(contactIndex!=1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back')
});

app.listen(port,function(err){
    if(err){
        console.log('Error while Listening',err);
     
        return;
    }
    console.log('server is up on port number:',port);
})