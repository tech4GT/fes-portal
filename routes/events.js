/**
 * Created by tech4GT on 9/29/17.
 */
const express = require('express')
const db = require('../db')
const util = require('../utils')
const router = express.Router()

router.post('/new', function (req, res) {
    var Event = {}
    Event.name = req.body.name
    Event.desc = req.body.desc
    Event.date = new Date(req.body.date)
    Event.venue = req.body.venue
    Event.archived = false

    req.checkBody('Name', 'name is required').notEmpty();
    req.checkBody('Date', 'date is required').notEmpty();
    req.checkBody('venue', 'venue is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('newevent', {
            errors: errors
        })
    }
    else {
        db.actions.events.addNew(Event.name, Event.desc, Event.date, Event.venue, req.body.sid, Event.archived, function (data) {
            res.render('event', {
                details : data.dataValues
            })
        })
    }

})
router.get('/', function (req, res) {
    res.render('newevent')
})
router.get('/:id',function (req, res) {
    db.actions.events.searchOne(req.params.id,function (data) {
        res.render('event',{
            details : data.dataValues
        })
    })
})


module.exports = router;