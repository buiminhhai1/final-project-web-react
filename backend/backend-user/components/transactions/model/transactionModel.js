const mongoose = require('mongoose');
const transactionSchema = mongoose.Schema({

    idUser: mongoose.Schema.Types.ObjectId,
    method: {
        type: String,
        enum: ["PAYMENT", "TRANSFER", "WITHDRAW"],
        require: true
    },
    detail: {
        payment: {
            contractId: {
                type: mongoose.Schema.Types.ObjectId,
                require: true
            },
            paymentId: {
                type: String,
                require: true
            },
            payerId: {
                type: String,
                require: true
            }
        },
        withdraw: {
            paypalEmail: {
                type: String,
                require: true
            }
        }
    },
    amount: {
        type: Number,
        require: true
    },
    currency: {
        type: String,
        default: "USD",
        require: true
    },
    time: {
        type: Date,
        default: Date.now,
        require: true
    }
});

module.exports = mongoose.model('transactions', transactionSchema);