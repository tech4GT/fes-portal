const db = require('../../db')
const router = require('express').Router()

router.get('/', function (req, res) {
    db.actions.events.getAll(data => res.send(data))
})
router.get('/:id', function (req, res) {
    db.actions.events.searchOne(req.params.id, data => res.send(data))
})

router.post('/new', function (req, res) {
    req.body.name = req.body.name ? req.body.name : ""
    req.body.desc = req.body.desc ? req.body.desc : ""
    req.body.date = req.body.date ? JSON.parse(req.body.date) : new Date()
    req.body.venue = req.body.venue ? req.body.venue : ""
    if (!req.body.sid) res.send({
        error: "please include the society id in the request"
    })
    db.actions.events.addNew(req.body.name, req.body.desc, req.body.date, req.body.venue,req.body.sid,false, data => res.send(data))
})

//todo add patch support


router.delete('/:id', function (req, res) {
    db.actions.events.deleteOne(req.params.id, data => res.send(data))
})


module.exports = router