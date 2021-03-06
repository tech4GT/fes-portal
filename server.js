const express = require('express')
const bp = require('body-parser')
const cp = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const path = require('path')
const exphbs = require('express-hbs')
const validator = require('express-validator')
const flash = require('connect-flash')
const fileupload = require('express-fileupload')
const multer = require('multer')
var upload = multer({ dest: 'public_html/photos' })

const routes = require('./routes')


var app = express();

app.use(bp.json({limit: '50mb'}));
app.use(bp.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cp())
app.use(fileupload());

app.post('/upload',function (req, res) {
    console.log(req.body)
    console.log(req.files.foo)

})


app.engine('hbs', exphbs.express4({
    layoutsDir: path.join(__dirname, 'views/layout'),
    defaultLayout: path.join(__dirname, 'views/layout/default.hbs')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'secret',

    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(validator({

    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';

        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(flash());
app.use(function (req, res, next) {
    //for hbs rendering
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

app.use('/api/v1',routes.api)
app.use('/users',routes.users)
app.use('/events',routes.events)
app.use('/codes',routes.codes)
app.use('/',express.static(path.join(__dirname,'public_html')),routes.home)


app.listen(4000, () => {
    console.log("Now running on port 4000");
})