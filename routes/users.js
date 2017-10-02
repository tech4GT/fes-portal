/**
 * Created by tech4GT on 9/29/17.
 */
const express = require('express')
const login = require('./login')
const acl = require('../acl')
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
router.get('/me',acl.EnsureLogin, function (req, res) {
    db.actions.users.findAllDetails(req.user.userId, function (data) {
        res.render('index', {
            details: data.dataValues
        })
    })
});
router.get('/events',acl.EnsureLogin,acl.EnsureLoginSociety,function (req, res) {
    db.actions.events.searchbysociety(req.user.id,function (data) {
        let arr = [];
        for (let a in data) {
            arr.push(data[a].dataValues)
        }
        res.render('eventlist',{
            data : arr
        })

    })
})

module.exports = router;