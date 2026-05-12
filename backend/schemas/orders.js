const mongoose = require('mongoose');
const schema = mongoose.Schema

const ordersSchema = new schema({
    transactionID: {
        type: String,
        required: true
    },
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    amount: {
        type: Number,
        required: true
    },
    hashedOTP: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const Orders = mongoose.model('Orders',ordersSchema);
module.exports = Orders;
