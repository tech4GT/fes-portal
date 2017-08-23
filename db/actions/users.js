const models = require('../models')
const bcrypt = require('bcrypt')
module.exports = {
    getAll: function (done) {
        models.Users.findAll({}).then(data => {
            done(data)
        })
    },
    addNew: function (name, email, college, bio, done) {
        models.Users.create({
            name: name,
            email: email,
            college: college,
            bio: bio
        }).then(data => {
            done(data)
        }).catch(err => {
            if (err) throw err;
        });
    },
    searchOne: function (id, done) {
        models.Users.findOne({
            where: {
                id: id
            }
        }).then(data => {
            done(data)
        }).catch((err) => {
            done(err)
        });
    },
    patchOne: function (id, obj, done) {
        searchOne(id, data => {
            data.update(obj)
        }).then(data => {
            done(data)
        }).catch(err => {
            if (err) throw err;
        });
    },
    deleteOne: function (id, done) {
        models.Userlocal.destroy({
            where: {
                userId: id
            }
        }).then(data => {
            models.Societyuser.destroy({
                where: {
                    userId: id
                }
            }).then(data => {
                models.Usersgoingtoevents.destroy({
                    where: {
                        userId: id
                    }
                }).then(data => {
                    models.Users.destroy({
                        where: {
                            id: id
                        }
                    }).then(responseData => {
                        done({
                            status : responseData
                        })
                    }).catch(err => {
                        if (err) throw err
                    })
                }).catch(err => {
                    if (err) throw err
                })
            }).catch(err => {
                if (err) throw err
            })
        }).catch(err => {
            if (err) throw err
        })
    },
    addLocaluser: function (username, password, uid, done) {
        bcrypt.hash(password, 10, function (err, hash) {
            password = hash;
            models.UserLocal
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
    }

}