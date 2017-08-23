const express = require('express')
const bp = require('body-parser')
const cp = require('cookie-parser')

const api_v1  = require('./routes/api_v1')


var app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended: true}))





app.use('/api/v1',api_v1)
app.listen(4000, () => {
    console.log("Now running on port 4000");
})