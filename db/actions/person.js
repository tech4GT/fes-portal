const models = require('../models')
const userfuns = require('./user')
module.exports = {
    getAll: function (done) {
        models.Person.findAll({}).then(data => {
            done(data)
        })
    },
    addNew: function (name, email, college, bio,photo, done) {
        userfuns.addNew(function (data) {
            models.Person.create({
                name: name,
                email: email,
                college: college,
                bio: bio,
                userId : data.dataValues.id,
                photo: photo
            }).then(data => {
                done(data)
            }).catch(err => {
                if (err) throw err;
            });
        })

    },
    searchOne: function (id, done) {
        models.Person.findOne({
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
    //FIXME fix the delete
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
                models.Persongoingtoevents.destroy({
                    where: {
                        userId: id
                    }
                }).then(data => {
                    models.Person.destroy({
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
    }

}