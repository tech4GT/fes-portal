/**
 * Created by tech4GT on 9/1/17.
 */

var passport = require('passport');
const localStrategy = require('./strategies/local');
const db = require('../db');

passport.use(localStrategy)
passport.serializeUser(function (user, done) {
    return done(null,{
        id : user.userId
    })
})
passport.deserializeUser(function (obj, done) {
    db.models.Societies.findOne({
        where : {
            userId : obj.id
        }
    }).then(function (data) {
        if(!data){
            db.models.Person.findOne({
                where : {
                    userId : obj.id
                }
            }).then(function (person) {
                return done(null,person.dataValues)
            }).catch(function (err) {
                if(err) throw err
            })
        }
        else{
            return done(null,data.dataValues)
        }
    }).catch(function (err) {
        if(err) throw err
    })
})

module.exports = passport


