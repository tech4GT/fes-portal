/**
 * Created by Varun Gupta on 10/11/2017.
 */
const rand = require('randomstring')
const models = require('../models')
module.exports = {
    generate: function (done) {
        models.Codes.create({
            code: rand.generate(5)
        }).then(function (data) {
            done(data)
        })
    },
    use: function (code,done) {
        models.Codes.findOne({
            where : {
                code : code
            }
        }).then(function (data) {
            if(!data) done(false)
            else{
                models.Codes.delete({
                    where : {
                        code: code
                    }
                }).then(function (data) {
                    done(true)
                }).catch(function (err) {
                    if(err) throw err;
                })
            }
        }).catch(function (err) {
            if(err) throw err;
        })
    }
}