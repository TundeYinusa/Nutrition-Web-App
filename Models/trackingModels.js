
const mongoose = require ("mongoose");



const trackingSchema = mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foods',
        required: true
    },
    eatenDate: {
        type: String,
        default: new Date().toLocaleDateString()

    },
    Quantity:{
        type: Number,
        required: true
    }
}, {timestamps: true})


const trackingModel = mongoose.model('trackings', trackingSchema);



module.exports = trackingModel;