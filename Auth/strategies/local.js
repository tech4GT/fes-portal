/**
 * Created by tech4GT on 9/1/17.
 */

const LocalStrategy = require('passport-local').Strategy
const db = require('../../db')

module.exports = new LocalStrategy(
    function (username, password, done) {
        db.models.Userlocal.findOne({
            where: {
                username: username
            },
            include: [{
                model: db.models.User,
                include: [{
                    model: db.models.Person
                },
                    {
                        model: db.models.Societies
                    }]
            }]
        }).then(function (data) {
            if (!data) {
                return done(null, false, {message: "Incorrect Username"});
            }
            else {
                db.actions.users.validateuser(data.dataValues, password, done, function (user, isValid, callback) {
                    if (isValid) {
                        callback(null, user);
                    }
                    else {
                        callback(null, false, {message: 'Invalid Password'});
                    }
                });
            }
        })
    }
)