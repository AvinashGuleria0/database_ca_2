const mongoose = require('mongoose');
const { type } = require('os');

const Restaurant = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    cuisine: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    menu: [{
            name: {
                type: String,
                required: true
            },
            description:{
                type: String,
            },
            price: {
                type: Number,
                required: true
            },            
    }]
})
module.exports = mongoose.model("res", Restaurant);