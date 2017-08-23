const db = require('../../db')
const router = require('express').Router()

router.get('/', function (req, res) {
    db.actions.societies.getAll(data => res.send(data))
})
router.get('/:id', function (req, res) {
    db.actions.societies.searchOne(req.params.id, data => res.send(data))
})

router.get('/:id/users', function (req, res) {
    db.actions.societyuser.getAllUsers(req.params.id, data => res.send(data))
})

router.post('/new', function (req, res) {
    req.body.name = req.body.name ? req.body.name : ""
    req.body.college = req.body.college ? req.body.college : ""
    db.actions.societies.addNew(req.body.name, req.body.college, data => res.send(data))
})

router.post('/:id/adduser', function (req, res) {
    req.body.users = req.body.users ? JSON.parse(req.body.users) : []
    req.body.users.forEach(function (num) {
        (function () {
            db.actions.societyuser.addNew(req.params.id, num, () => {
            })
        })();
    })
    res.send({success: true})
})

//todo add patch support


router.delete('/:id', function (req, res) {
    db.actions.societies.deleteOne(req.params.id, data => res.send(data))
})


module.exports = router