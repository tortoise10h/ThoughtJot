//load idea model
const mongoose = require('mongoose');
require('../models/Idea');
const Idea = mongoose.model('ideas');


module.exports.getAllIdeas = async (req,res) => {
    let ideas = await Idea.find({});
    res.render('../views/ideas/index',{
        ideas:ideas
    });
}

module.exports.addIdea = (req,res) => {
    let errors = [];

    if(!req.body.title){
        errors.push({text:'Please enter a title'});
    }

    if(!req.body.details){
        errors.push({text:'Please enter some details for your idea'});
    }

    if(errors.length > 0){
        res.render('../views/ideas/add',{
            errors:errors,
            title:req.body.title,
            details:req.body.details
        });
    }else{
        let newIdea = {
            title: req.body.title,
            details: req.body.details
        };

        new Idea(newIdea)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            })
    }
}

module.exports.getIdeaById = async (req,res) => {
    let idea = await Idea.findOne({
        _id:req.params.id
    });

    res.render('../views/ideas/edit',{
        idea:idea
    });
}

module.exports.updateIdea = async (req,res) => {
    let idea = await Idea.findOne({
        _id: req.params.id
    });

    idea.title = req.body.title;
    idea.details = req.body.details;

    idea.save()
        .then(idea => {
            res.redirect('/ideas');
        })
}

module.exports.deleteIdea = (req, res) => {
    Idea.deleteOne({
        _id:req.params.id
    }).then(() => {
        res.redirect('/ideas');
    });
}