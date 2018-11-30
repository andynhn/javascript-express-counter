var express = require("express");
var session = require('express-session');
var path = require("path");
var app = express();

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }  
}))


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view


app.get('/', function(req, res) {
    if (typeof req.session.counter == "undefined"){
        req.session.counter = 1;
    } else {
        req.session.counter++;
    }
    res.render("index", { counter: req.session.counter });
})

app.get('/addtwo', function(req, res) {
    req.session.counter += 1;
    res.redirect('/')
})

app.get('/reset', function(req, res) {
    req.session.counter = 0;
    res.redirect('/')
})


// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});