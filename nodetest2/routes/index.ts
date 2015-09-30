///<reference path='../types/DefinitelyTyped/node/node.d.ts'/>

///<reference path='../types/DefinitelyTyped/express/express.d.ts'/>

class Router{
     router;
    constructor(){

var express = require('express');
this.router = express.Router();
/* GET home page. */
this.router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET Hello World page. */
this.router.get('/helloworld', function(req, res, next) {
    res.render('helloworld', { title: 'Hello, World!' });
});
this.router.get('/who/:name?', function(req, res, next) {
	var name = req.params.name;
	res.send(name + " was here");
});
/* GET Userlist page. */
this.router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
/* GET New User page. */
this.router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});
/* POST to Add User Service */
this.router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    var newUser = new User(userName,userEmail);
    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : newUser.getName(),
        "email" : newUser.getEmail(),

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});
}
}
var routerObject = new Router();
module.exports = routerObject.router;

interface UserInterface{
    getName():string;
    getEmail():string;
}

class User implements UserInterface{
    private name: string;
    private email: string;
    constructor(name, email){
        this.name = name;
        this.email = email;
    }
    getName():string{
            return this.name;
    }
    getEmail():string{
            return this.email;
    }
}