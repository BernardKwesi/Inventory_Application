var express = require('express');
var router = express.Router();

const categoriesController =require('../controllers/categoriesController');
const itemsController = require('../controllers/itemsController');

//Defining Route for homepage
router.get('/',categoriesController.category_list);


//Routes for Category
router.get('/category/create',categoriesController.category_create_get);
router.post('/category/create',categoriesController.category_create_post);

router.get('/category/:id/delete',categoriesController.category_delete_get);
router.post('/category/:id/delete',categoriesController.category_delete_post);

router.get('/category/:id/update',categoriesController.category_update_get);
router.post('/category/:id/update',categoriesController.category_update_post);

router.get('/category/:id',categoriesController.category_index);


//Routes for Items 
router.get('/item/create', itemsController.item_create_get);
router.post('/item/create', itemsController.item_create_post);

router.get('/item/:id/update', itemsController.item_update_get);
router.post('/item/:id/update', itemsController.item_update_post);

router.get('/item/:id/delete', itemsController.item_delete_get);
router.post('/item/:id/delete', itemsController.item_delete_post);

//item details
router.get('/item/:id',itemsController.item_details_get)

module.exports = router;