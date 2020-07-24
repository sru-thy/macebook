const express = require("express"),
    expressLayouts = require('express-ejs-layouts')
    mongoose = require("mongoose"),
    User = require("./models/Users"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride = require('method-override')
    cookieParser = require('cookie-parser'),
    connectFlash = require('connect-flash');
   // multer = require('multer');
   
require('./configs/database');

//var forms = multer();
const app = express()

app.set('view engine','ejs')
app.set('layout','layouts/layout')
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(forms.array()); 
app.use(expressLayouts)
app.use(express.static('public'))


app.use(cookieParser('process.env.SESSION_SECRET'));
app.use(require("express-session")({
    secret:'process.env.SESSION_SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge : 4000000 }
}));
  
app.use(methodOverride('_method'))
passport.use(User.createStrategy());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectFlash());

app.use(function (req, res, next) {
    res.locals.user = req.user;
    res.locals.isauth = req.isAuthenticated();
    next();
});

app.set('views',__dirname + '/views')
app.use('/',require('./routes/index'))
app.use('/',require('./routes/auth'))

app.listen(process.env.PORT || 3000,function(){
    console.log('listening to port ')
})
