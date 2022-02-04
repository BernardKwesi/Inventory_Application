let Items =  require('../models/item');
let Category= require('../models/category');
let {body,validationResult} =require('express-validator');
let async = require('async');

exports.category_list=function(req,res,next){
    Category.find().exec(function (err, list_categories){
            if(err) return next(err);

            res.render('category_list',{title:'Categories List',list_categories: list_categories});
    })
    
   
}
exports.category_create_get =function(req,res){
    res.render('category/category_form',{title:'Create Category'});
}
exports.category_create_post =[
body('name','Category Name is specified').trim().isLength({min:1}).escape(),
body('description','Category Description is specified').trim().isLength({min:1}).escape(),

function(req,res,next){
    const errors = validationResult(req);

    let category = new Category({
        name:req.body.name,
        description:req.body.description
    });

    if(!errors.isEmpty()){
        res.render('category_form',{title:'Create Category', errors:errors.array(),category:category});
        return;
    }
    else{
        category.save(function (err){
            res.redirect('/inventory');
        })
    }
}

]

exports.category_delete_get = function(req,res){

    async.parallel({
        category:function(callback) {
            Category.findById(req.params.id).exec(callback);
        },
        items:function(callback){
            Items.find({category:req.params.id}).exec(callback);
        }
    },
    function(err,results){
        if(err) return next(err);
        if(results.category == null){
            res.redirect('/inventory');
        }

        res.render('category_delete',{title:'Delete Category',category:results.category, items:results.items});
    })
   
}
exports.category_delete_post = function(req,res,next){
        async.parallel({
            category:function(callback){
                Category.findById(req.body.category_id).exec(callback);
            },
            items:function(callback){
                Items.find({'category':req.body.category_id}).exec(callback);
            }
        },function(err,results){
            if(err) return next(err);
            if(results.items.length > 0 ){
                res.render('category_delete',{title:'Delete Category',category:results.category, items:results.items});
            }
            else{
                Category.findByIdAndDelete(req.body.category_id,function(err){
                    if(err) return next(err);
                    
                    res.redirect('/inventory');
                })
            }
        })
}

exports.category_update_get = function(req,res){
    async.parallel({
        category:function(callback){
        
                Category.findById(req.params.id).exec(callback);
            
    }
},function(err,results){
    if(err) return next(err);
    if(results.category == null ){
        let err= new Error('Category Not Found');
      err.status =404;
      return next(err);
    }
 
    res.render('category_form',{title:'Update Category',category:results.category})
})
   
    }
    


exports.category_update_post = function(req,res){
    body('name','Category Name is specified').trim().isLength({min:1}).escape(),
    body('description','Category Description is specified').trim().isLength({min:1}).escape(),
    
    function(req,res,next){
        const errors = validationResult(req);
    
        let category = new Category({
            _id : req.params.id,
            name:req.body.name,
            description:req.body.description
        });
    
        if(!errors.isEmpty()){
            res.render('category_form',{title:'Create Category', errors:errors.array(),category:category});
            return;
        }
        else{
            Category.findByIdAndUpdate(req.params.id,category,{},function(err,updated){
                if(err) return next(err)
                res.redirect(updated.url);
            })
        }
    }
      
}

exports.category_index =function(req,res){
    async.parallel({
        category:function(callback){
            Category.findById(req.params.id).exec(callback);
        },
        items:function(callback){
            Items.find({'category':req.params.id}).exec(callback);
        }
    },function(err,results){
        if(err) return next(err);
        if(results.category == null){
            let err= new Error('Category Not Found');
            err.status =404;
            return next(err);
        }
        res.render('category_details',{title:'Category Details',category:results.category, items:results.items});
    })
    
}
