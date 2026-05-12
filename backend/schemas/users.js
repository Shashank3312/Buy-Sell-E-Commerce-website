const mongoose = require('mongoose');

const schema = mongoose.Schema

const usersSchema = new schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    cartItems: [
        {
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Items'
            },
            
        }
    ],
    sellerReviews: {
        type: [String],
        required: false
    }
})

const Users = mongoose.model('Users',usersSchema);
module.exports = Users;
