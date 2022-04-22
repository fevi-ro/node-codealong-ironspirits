const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        min: 1
    },
    hasStock: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
        enum: ["spirit", "drink", "italian", "mexican", "white"]
    },
    imgFile: {
        type: String,
        default: "mouri.jpg"
    },
    store: {
        type: String,
        enum: ["online", "germany", "colombia"]
    }

});



const Product = mongoose.model('Product', productSchema);

module.exports = Product; //export this item to the other files