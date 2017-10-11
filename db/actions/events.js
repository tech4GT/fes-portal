const models = require('../models')
module.exports = {
    getAll: function (done) {
        models.Events.findAll({
            include: [{
                model: models.Societies,
                attributes: ['id', 'name', 'college']
            }]
        }).then(data => {
            done(data)
        })
    },
    addNew: function (name, desc, date, venue, sid,photo, archived, done) {
        models.Events.create({
            name: name,
            desc: desc,
            date: date,
            venue: venue,
            societyId: sid,
            photo: photo,
            archived: archived
        }).then(data => {
            done(data)
        }).catch(err => {
            if (err) throw err
        })
    },
    searchOne: function (id, done) {
        models.Events.findOne({
            where: {
                id: id
            },
            include: models.Societies
        }).then(data => {
            done(data)
        }).catch((err) => {
            done(err)
        });
    },
    searchbysociety: function (sId, done) {
        models.Events.findAll({
            where: {
                societyId: sId
            }
        }).then(function (data) {
            done(data)
        }).catch(function (err) {
            if(err) throw err;
        })
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
        models.Events.destroy({
            where: {
                id: id
            }
        }).then(data => {
            done({
                status: data
            })
        }).catch(err => {
            if (err) throw err
        })
    }
}