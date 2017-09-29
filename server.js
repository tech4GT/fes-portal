const express = require('express')
const bp = require('body-parser')
const cp = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
const exphbs = require('express-hbs')
const validator = require('express-validator')
const flash = require('connect-flash')


const routes  = require('./routes')


var app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: true}))
app.use(cp())
app.use(session({
    secret : 'secret',

    saveUninitialized: true
}))
//Enable login and auth




app.use('/',express.static(path.join(__dirname,'public_html')),routes.home)
app.use('/users',routes.users)
app.use('events',routes.events)
app.use('/api/v1',routes.api)
app.listen(4000, () => {
    console.log("Now running on port 4000");
})