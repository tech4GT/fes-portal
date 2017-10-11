/**
 * Created by tech4GT on 10/2/17.
 */
const db = require('./db')
module.exports = {
    EnsureLogin : function (req, res, next) {
        if(req.user) next()
        else res.render('login',{})
    },
    EnsureLoginSociety : function (req, res,next) {
        db.models.Societies.findOne({
            where : {
                userId : req.user.userId
            }
        }).then(function (data) {
            if(!data) res.send({
                "authorized" : false
            })
            else{
                next();
            }
        })
    },
    EnsureAdmin: function (req, res, next) {
        db.models.Admins.findOne({
            where : {
                userId : req.user.userId
            }
        }).then(function (data) {
            if(!data) {
                res.send({
                    "authorized" : false
                })
            }
            else{
                next();
            }
        })
    },
    EnsureGrantAdmin: function (req, res, next) {
        db.models.Admins.findOne({
            where : {
                userId : req.user.userId
            }
        }).then(function (data) {
            if(data.dataValues.grant){
                next();
            }
            else{
                res.send({
                    "Authorized" : false
                })
            }
        })
    }
}