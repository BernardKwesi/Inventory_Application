let Item =  require('../models/item');
let Category= require('../models/category');
let {body,validationResult} =require('express-validator');
let async = require('async');

exports.item_create_get =function(req,res){
    async.parallel({
        category:function(callback){
            Category.find(callback);
        }
    },function(err,results){
        if(err) return next(err);

        res.render('item_form',{title:'Create Item',category:results.category});
    })
   
}
exports.item_create_post=[
    //Validate the form
    body('name','Item Name is required').trim().isLength({min:1}).escape(),
    body('description','Item Description is required').trim().isLength({min:1}).escape(),
    body('category','The Category is required').trim().isLength({min:1}).escape(),
    body('price','The Item price is required').trim().isLength({min:1}).escape(),
    body('number_in_stock', 'THe number in stock is required').trim().isLength({min:1}).escape(),

    function(req,res, next){
        const errors = validationResult(req);

        let item = new Item({
            name: req.body.name,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            number_in_stock:req.body.number_in_stock
        });

        if(!errors.isEmpty()){
            async.parallel({
                category:function(callback){
                    Category.find(callback);
                }
            },function(err,results){
                if(err) return next(err);
        
                res.render('item_form',{title:'Create Item',category:results.category,item : item,error:errors.array()});
            })
           
        }else{
            item.save(function (err,savedItem){
                if(err) return next(err);
                res.redirect(savedItem.url);
            })
        }
    }
]


exports.item_delete_get=function(req,res){
    async.parallel({
        item:function(callback){
            Item.findById(req.params.id).exec(callback);
        }
    },function(err,results){
        if(err) return next(err)
            if(results.item == null){
                let err = new Error("Item Not found");
                err.status = 404;
                return next(err);
            }
        res.render('item_delete',{title:'Delete Item',item:results.item});
    });
   
}
exports.item_delete_post=function(req,res){

    sync.parallel({
        item:function(callback){
            Item.findById(req.params.id).exec(callback);
        }
    },function(err,results){
        if(err) return next(err)

        Item.findByIdAndUpdate(req.body.item_id,function(err){
            if(err) return next(err);

            res.redirect('/inventory');
        })
        
    });

}
exports.item_update_get = function(req,res){
    async.parallel({
        item:function(callback){
            Item.findById(req.params.id).populate('category').exec(callback);
        },
        category:function(callback){
            Category.find(callback);
        }
    },function(err,results){
        if(err) return next(err);
        if(results.item == null){
            let err= new Error('Item not Found');
            err.status =404;
            return next(err);
        }
        res.render('item_form',{title:'Update Item',category:results.category, item:results.item})
    });
    
    
}

exports.item_update_post = [
    //Validate the form
    body('name','Item Name is required').trim().isLength({min:1}).escape(),
    body('description','Item Description is required').trim().isLength({min:1}).escape(),
    body('category','The Category is required').trim().isLength({min:1}).escape(),
    body('price','The Item price is required').trim().isLength({min:1}).escape(),
    body('number_in_stock', 'THe number in stock is required').trim().isLength({min:1}).escape(),

    function(req,res, next){
        const errors = validationResult(req);

        let item = new Item({
            _id:req.params.id,
            name: req.body.name,
            description:req.body.description,
            category:req.body.category,
            price:req.body.price,
            number_in_stock:req.body.number_in_stock
        });

        if(!errors.isEmpty()){
            async.parallel({
                category:function(callback){
                    Category.find(callback);
                }
            },function(err,results){
                if(err) return next(err);
        
                res.render('item_form',{title:'Update Item',category:results.category,item : item,error:errors.array()});
            });
           
        }else{
            Item.findByIdAndUpdate(req.params.id,item,{},function (err,updatedItem){
                if(err) return next(err);
                res.redirect(updatedItem.url);
            });
        }
    }
]
exports.item_details_get = function(req,res){
    async.parallel({
        item:function(callback){
            Item.findById(req.params.id).populate('category').exec(callback);
        }
    },function(err,results){
        if(err) return next(err);
        res.render('item_details',{title:'Item Details',item:results.item});
    })
   
    
}
