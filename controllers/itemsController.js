let Items =  require('../models/item');
let Category= require('../models/category');
let {body,validationResult} =require('express-validator');
let async = require('async');

exports.item_create_get =function(req,res){
    res.render('item_form',{title:'Create Item'})
}
exports.item_create_post=function(req,res){

}
exports.item_delete_get=function(req,res){
    res.render('item_delete',{title:'Delete Item'});
}
exports.item_delete_post=function(req,res){

}
exports.item_update_get = function(req,res){
    res.render('item_form',{title:'Update Item'});
}
exports.item_update_post = function(req,res){
    
}
exports.item_details_get = function(req,res){
    res.render('item_details',{title:'Item Details'});
}
