/**
 * Created by tech4GT on 9/29/17.
 */
const express = require('express')
const db = require('../db')
const util = require('../utils')
const router = express.Router()

router.use('/', function (req, res) {
    db.actions.events.getAll(function (data) {
        let arr = [];
        for (let a in data) {
            arr.push(data[a].dataValues)
        }
        arr.sort(util.compare)
        arr.splice(4)
        res.render('home', {
            data: arr
        })
    })
})


module.exports = router;