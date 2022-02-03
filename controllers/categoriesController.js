let Items =  require('../models/item');
let Category= require('../models/category');
let {body,validationResult} =require('express-validator');
let async = require('async');

exports.category_list=function(req,res,next){
    res.json({msg:'Hello From Inventory'});
}
exports.category_create_get =function(req,res){
    res.render('category_form',{title:'Create Category'});
}
exports.category_create_post =function(req,res,next){

};

exports.category_delete_get = function(req,res){

    res.render('category_delete',{title:'Delete Category'});
}
exports.category_delete_post = function(req,res){

}

exports.category_update_get = function(req,res){
    res.render('category_form',{title:'Update Category'});
}

exports.category_update_post = function(req,res){
   
}

exports.category_index =function(req,res){
    res.render('category_details',{title:'Category Details'});
}
