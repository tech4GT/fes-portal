/**
 * Created by tech4GT on 9/29/17.
 */
const express = require('express')
const db = require('../db')
const passport = require('../Auth/passport')
const secrets = require('../secrets.json')
const router = express.Router()

router.get('/', function (req, res) {
    if (req.query.society == "true") {
        res.render('signupsociety', {})
    }
    else if (req.query.society == "false") {
        res.render('signupperson', {})
    }
    else
        res.render('signupas', {})
})
router.post('/', function (req, res) {
    if (req.query.society == "true") {
        const Society = {};
        Society.name = req.body.Name;
        Society.username = req.body.Username;
        Society.college = req.body.College;
        Society.description = req.body.Description;
        Society.password = req.body.Password;
        Society.password2 = req.body.Password2;

        //Validation
        req.checkBody('Code', 'Code is not correct').equals(secrets.S_code)
        req.checkBody('Name', 'name is required').notEmpty();
        req.checkBody('College', 'College is required').notEmpty();
        req.checkBody('Username', 'Username is required').notEmpty();
        req.checkBody('Password', 'Password is required').notEmpty();
        req
            .checkBody('Password2', 'passwords do not match')
            .equals(req.body.Password);

        var errors = req.validationErrors();
        if (errors) {
            res.render('signupsociety', {
                errors: errors
            })
        }
        else {
            db.actions.societies.addNew(Society.name, Society.college, Society.description, function (data) {
                db.actions.users.addLocaluser(Society.username, Society.password, data.userId, function (resData) {
                    req.flash(
                        'success_msg',
                        'You are registered as Society and can now log in'
                    );
                    res.redirect('/users/login')
                })
            })
        }
    }
    else {
        const Person = {};
        Person.name = req.body.Name;
        Person.username = req.body.Username;
        Person.email = req.body.Email;
        Person.password = req.body.Password;
        Person.password2 = req.body.Password2;
        Person.college = req.body.College;
        Person.bio = req.body.Bio;

        //Validation
        req.checkBody('Name', 'name is required').notEmpty();
        req.checkBody('College', 'College is required').notEmpty();
        req.checkBody('Email', 'email is required').notEmpty();
        req.checkBody('Email', 'not a valid email').isEmail();
        req.checkBody('Username', 'Username is required').notEmpty();
        req.checkBody('Password', 'Password is required').notEmpty();
        req
            .checkBody('Password2', 'passwords do not match')
            .equals(req.body.Password);
        var errors = req.validationErrors();
        if (errors) {
            res.render('signupperson', {
                errors: errors
            })
        }
        else {
            db.actions.person.addNew(Person.name, Person.email, Person.college, Person.bio, function (data) {
                db.actions.users.addLocaluser(Person.username, Person.password, data.userId, function (resData) {
                    req.flash(
                        'success_msg',
                        'You are registered as User and can now log in'
                    );
                    res.redirect('/users/login')
                })
            })
        }
    }
})


module.exports = router;