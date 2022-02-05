const mongoose = require('mongoose');
const {Schema } = mongoose;


let itemSchema = new Schema({
        name:{type:String , required:true},
        description:{type:String, required:true},
        category:{type:Schema.Types.ObjectId, ref:'Category', required:true},
        price: {type:Number, required:true},
        number_in_stock:{type:Number ,required:true}
});

itemSchema.virtual('url').get(function(){
    return '/inventory/item/'+this._id;
});

module.exports = mongoose.model('Item',itemSchema);