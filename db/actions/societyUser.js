/**
 * Created by tech4GT on 8/24/17.
 */
const models = require('../models')

module.exports = {
    addNew: function (societyId, userId, done) {
        models.Societyusers.create({
            societyId: societyId,
            userId: userId
        }).then(data => done(data)).catch(err => {
            if (err) throw err;
        })
    },
    getAllUsers : function (societyId,done) {
        models.Societyusers.findAll({
            where : {
                societyId: societyId
            },
            include : models.Users
        })
    },
    getAllSocieties : function (userId, done) {
        models.Societyusers.findAll({
            where : {
                userId: userId
            },
            include : models.Societies
        })
    }
}