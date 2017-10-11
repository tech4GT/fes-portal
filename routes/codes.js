/**
 * Created by Varun Gupta on 10/11/2017.
 */
const express = require('express')
const db = require('../db')
const acl = require('../acl')
const router = express.Router()

router.get('/',acl.EnsureLogin,acl.EnsureAdmin,function (req, res) {
    res.render('adminconsole',{
        code : ""
    })
})
router.get('/new',acl.EnsureLogin,acl.EnsureAdmin,function (req, res) {
    db.actions.codes.generate(function (data) {
        res.render('adminconsole',{
            code : data.code
        })
    })
})

module.exports = router

