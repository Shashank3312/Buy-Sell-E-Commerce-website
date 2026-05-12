const mongoose = require('mongoose');
const schema = mongoose.Schema

const itemsSchema = new schema({
    Name: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },      
    category: {
        type: String,
        required: true,
        enum: ['clothing', 'grocery', 'electronics', 'furniture', 'books','sports','others']
    },  
    SellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
})

const Items = mongoose.model('Items',itemsSchema);
module.exports = Items;
