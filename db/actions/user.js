/**
 * Created by tech4GT on 10/2/17.
 */
const models = require('../models')
const bcrypt = require('bcrypt')

module.exports = {
    addNew : function (done) {
        models.User.create({}).then(data=>{
            if(data.id == 1){
                models.Admins.create({
                    userId : data.id,
                    grant: true
                }).then(function (data) {
                    done(data)
                }).catch(function (err) {
                    if(err) throw err
                })
            }
            else done(data)
        })
    },

    deleteOne : function (id, done) {
        models.User.destroy({
            where : {
                id : id
            }
        }).then(function (data) {
            done()
        })
    },

    addLocaluser: function (username, password, uid, done) {
        bcrypt.hash(password, 10, function (err, hash) {
            password = hash;
            models.Userlocal
                .create({
                    username: username,
                    password: password,
                    userId: uid
                })
                .then(function (data) {
                    done(data);
                })
                .catch(function (err) {
                    if (err) throw err;
                });
        });
    },
    validateuser : function (user, password, PassportDone, done) {
        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) throw err;
            done(user, isMatch, PassportDone);
        });
    },
    findAllDetails : function (userId,done) {
        models.Societies.findOne({
            where : {
                userId : userId
            }
        }).then(function (data) {
            if(!data){
                models.Person.findOne({
                    where : {
                        userId : userId
                    }
                }).then(function (data) {
                    done(data)
                }).catch(function (err) {
                    if(err) throw err;
                })
            }
            else{
                done(data)
            }
        }).catch(function (err) {
            if(err) throw err;
        })
    },
    makeAdmin(userId,grant,done){
        models.Admins.create({
            userId : userId,
            grant: grant
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        })
    }
}