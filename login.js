const mysql = require("mysql");
const express = require("express")
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets", express.static("assets"));
app.use("/images", express.static("images"));


app.set('view engine','ejs')




const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234",
    database:"nodejs"
});

//connect to the database
connection.connect(function(error){
    if(error) throw error
    else console.log("connected to the database successfully!")
});




app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username, password], function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/web");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

//when login is success
app.get("/web", function(req,res){
    res.sendFile(__dirname + "/web.html")
})

//set app port
app.listen(4000);