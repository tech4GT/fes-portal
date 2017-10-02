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
    }
}