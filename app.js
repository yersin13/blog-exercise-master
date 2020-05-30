//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require('lodash');
var lowerCase = require('lodash.lowercase');


const homeStartingContent = "Make your ideas come to life, click compose to create your first entrance. ";
const aboutContent = "Here there would be about Us if there were any Us..";
const contactContent = "Why do German girls all have the same phone number? Seriously, every one of them I ask says 999-9999";
const postArray = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));





app.get("/about", function (req, res) {
    res.render(__dirname + "/views/about.ejs", {
        aboutText: aboutContent
    });
});

app.get("/contact", function (req, res) {
    res.render(__dirname + "/views/contact.ejs", {
        contactText: contactContent
    });
});


app.get("/compose", function (req, res) {
    res.render(__dirname + "/views/compose.ejs");
});



//Dinamic path with route parameter (Express)
app.get("/post/:postName", function (req, res) {
    const requestedTitle = lowerCase(req.params.postName);

    postArray.forEach(function (post) {
        const storedTitle = lowerCase(post.title);


        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content:post.content
            });
        }
    });
});

//Create an Array to store all the titles and bodyPos in one variable.

app.post("/compose", function (req, res) {

    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    }

    postArray.push(post);

    res.redirect("/");
});



app.get("/", function (req, res) {
    res.render(__dirname + "/views/home.ejs", {
        startingContent: homeStartingContent,
        posts: postArray
    });


});



app.listen(3000, function () {
    console.log("Server started on port 3000");
});
