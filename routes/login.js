/**
 * Created by tech4GT on 9/29/17.
 */
const express = require('express')
const db = require('../db')
const passport = require('../Auth/passport')
const router = express.Router()

router.get('/', function(req, res) {
    res.render('login');
});
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/users/me',
        failureRedirect: '/users/login',
        failureFlash: true
    }),
    (req, res) => {
        res.redirect('/users/me');
    }
)


module.exports = router;