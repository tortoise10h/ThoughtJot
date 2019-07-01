//load user model
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('users');
const bcrypt = require('bcryptjs');
const passport = require('passport');

module.exports.regisAccount = (req,res) => {
    let errors = [];
    
    if(req.body.password != req.body.confirmpassword){
        errors.push({text:'Password and Confirm Password is not match'});
    }

    if(req.body.password.length < 6){
        errors.push({text:'Password must be at lease 6 characters'});   
    }

    if(errors.length > 0){
        res.render('../views/users/register', {
            errors:errors,
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            confirmpassword:req.body.confirmpassword
        })
    }else{
        User.findOne({email:req.body.email})
            .then(user => {
                if(user){
                    res.render('../views/users/register',{
                        errors:{text:'email is already registed'}
                    })
                }else{
                    const newUser = new User({
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password
                    });
            
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password,salt,(err,hash) => {
                            if(err) throw err;
                            newUser.password = hash;
                            //save new user to database
                            newUser.save()
                                .then(user => {
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                });
                        });            
                    });

                }
            });
    }
}

module.exports.login = (req,res) => {
    
}