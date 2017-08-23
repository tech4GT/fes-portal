const models = require('../models')
const bcrypt = require('bcrypt')
module.exports = {
    getAll: function (done) {
        models.Societies.findAll({}).then(data => {
            done(data)
        })
    },
    addNew: function (name, college, done) {
        models.Societies.create({
            name: name,
            college: college,
        }).then(data => {
            done(data)
        }).catch(err => {
            if (err) throw err;
        });
    },
    searchOne: function (id, done) {
        models.Societies.findOne({
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
        models.Societylocal.destroy({
            where: {
                societyId: id
            }
        }).then(data => {
            models.Societyuser.destroy({
                where: {
                    societyId: id
                }
            }).then(data => {
                models.Events.destroy({
                    where: {
                        societyId: id
                    }
                }).then(data => {
                    models.Societies.destroy({
                        where: {
                            id: id
                        }
                    }).then(responseData => {
                        done({
                            status: responseData
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
    addLocalsociety: function (username, password, sid, done) {
        bcrypt.hash(password, 10, function (err, hash) {
            password = hash;
            models.UserLocal
                .create({
                    username: username,
                    password: password,
                    societyId: sid
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