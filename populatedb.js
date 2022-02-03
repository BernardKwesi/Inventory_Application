#! /usr/bin/env node

console.log('This script populates some test Categories and Items to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Item = require('./models/item')
var Category = require('./models/category')



var mongoose = require('mongoose');

var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var categories = []
var items = []


function categoriesCreate(name, description, cb) {
 
  
  var category = new Category({
      name:name,
      description:description
  });
       
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}


function itemCreate(name,description,category,price,number_in_stock, cb) {
 let  itemdetail = { 
    name: name,
    description: description,
    category: category,
    price: price,
    number_in_stock : number_in_stock
  }
  
    
  var item = new Item(itemdetail);    
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item)
    cb(null, item)
  }  );
}



function createCategories(cb){
    async.parallel([
            function(callback){
                categoriesCreate('smartphones ','The sale of smart phones ',callback);
            },
            function(callback){
                categoriesCreate('Personal Computers','The sale of personal Computers',callback);
            },
            function(callback){
                categoriesCreate('Tablets','The sale of Tablets ',callback);
            },
            function(callback){
                categoriesCreate('Wearables','The sale of wearables',callback);
            },
            function(callback){
                categoriesCreate('Accessories','The sale of Accessories',callback);
            }

    ],cb)
}
function createItems(cb){
    async.parallel([
        function(callback){
                itemCreate('iphone4','The sale of iphone4',categories[0],100,45,callback);
        },
        function(callback){
            itemCreate('iphone5','The sale of iphone5',categories[0],110,4,callback);
    },
    function(callback){
        itemCreate('iphone6','The sale of iphone6',categories[0],140,15,callback);      
        },
    function(callback){
    itemCreate('iphone7','The sale of iphone7',categories[0],160,5,callback);
    },
    function(callback){
        itemCreate('iphone8','The sale of iphone8',categories[0],180,18,callback);
},
function(callback){
    itemCreate('MacBook Air','The sale of MacBook Air',categories[1],300,10,callback);
},
function(callback){
    itemCreate('MacBook Pro','The sale of MacBook Pro',categories[1],400,3,callback);
}

    ]);
}



async.series([
    createCategories,
    createItems
    
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Items: '+items);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



