/**
 * Created by tech4GT on 9/29/17.
 */
const express = require('express')
const login = require('./login')
const db = require('../db')
const signup = require('./signup')

const router = express.Router()

router.use('/signup', signup)
router.use('/login', login)
router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success_msg', 'you have successfuly logged out');
    res.redirect('/users/login');
});
router.get('/me', function (req, res) {
    console.log(req.user)
    db.actions.users.findAllDetails(req.user.userId, function (data) {
        console.log(data)
        res.render('index', {
            details: data.dataValues
        })
    })
})

module.exports = router;