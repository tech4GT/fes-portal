const router = require('express').Router()


const events = require('./events')
const societies = require('./societies')
const users  = require('./users')



router.use('/events',events)
router.use('/societies',societies)
router.use('/users',users)


module.exports = router