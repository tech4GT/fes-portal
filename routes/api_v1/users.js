const db = require('../../db')
const router = require('express').Router()

router.get('/', function (req, res) {
    db.actions.users.getAll(data => res.send(data))
})
router.get('/:id', function (req, res) {
    db.actions.users.searchOne(req.params.id, data => res.send(data))
})

router.get('/:id/societies', function (req, res) {
    db.actions.societyuser.getAllSocieties(req.params.id, data => res.send(data))
})

router.post('/new', function (req, res) {
    req.body.name = req.body.name ? req.body.name : ""
    req.body.email = req.body.email ? req.body.email : ""
    req.body.college = req.body.college ? req.body.college : ""
    db.actions.users.addNew(req.body.name, req.body.email, req.body.college, req.body.bio, data => res.send(data))
})


//todo add patch support


router.delete('/:id', function (req, res) {
    db.actions.users.deleteOne(req.params.id, data => res.send(data))
})


module.exports = router