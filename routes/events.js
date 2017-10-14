/**
 * Created by tech4GT on 9/29/17.
 */
const express = require('express')
const db = require('../db')
const util = require('../utils')
const acl = require('../acl')
const randomstring = require('randomstring')
const router = express.Router()

router.post('/new',acl.EnsureLogin,acl.EnsureLoginSociety, function (req, res) {
    var Event = {}
    Event.name = req.body.Name
    Event.desc = req.body.Desc
    Event.date = new Date(req.body.Date)
    Event.venue = req.body.Venue
    Event.archived = false

    req.checkBody('Name', 'name is required').notEmpty();
    req.checkBody('Date', 'date is required').notEmpty();
    req.checkBody('Venue', 'venue is required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('newevent', {
            errors: errors
        })
    }
    else {
        let photo = req.files.Photo
        let photoname = randomstring.generate()
        photo.mv('/public_html/photos/' + photoname + ".jpeg",function (err) {
            if(err) throw err;
            else{
                db.actions.events.addNew(Event.name, Event.desc, Event.date, Event.venue, req.user.id,photoname, Event.archived, function (data) {
                    res.render('event', {
                        details : data.dataValues
                    })
                })
            }
        })

    }

})
router.get('/new',acl.EnsureLogin,acl.EnsureLoginSociety, function (req, res) {
    res.render('newevent')
})
router.get('/:id',function (req, res) {
    db.actions.events.searchOne(req.params.id,function (data) {
        res.render('event',{
            details : data.dataValues
        })
    })
})
router.get('/',function (req, res) {
    db.actions.events.getAll(function (data) {
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