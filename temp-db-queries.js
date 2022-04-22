const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose
    .connect('mongodb://localhost/ironborn-ecommerce')
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));

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
    imgSrc: {
        type: String,
        default: "https://via.placeholder.com/700x400"
    }


});



const Product = mongoose.model('Product', productSchema);

//const Product = mongoose.model('Produt', { title: String, price: Number });

// the name of the collection will automatically be products (in plural and lowercase)

// Product.create({ title: "limoncello", price: 10 })
//     .then((product) => { console.log("a new product was created", product); })
//     .catch((error) => { console.log("error creating a product in DB", error); })


Product.find({ price: { $gt: 20 } })
    .then((allProducts) => {
        console.log(allProducts)
    })
    .catch(error => console.log("error getting products from DB", error));


Product.create({ title: "tequila", price: 35, hasStock: true, tags: ["mexican", "spirit", "white"] })
    .then((product) => { console.log("a new product was created", product); })
    .catch((error) => { console.log("error creating a product in DB", error); })


// Recipe.create({ title: "kao shoi", price: 25 })
// .then(product => {
//     console.log("a new product was created", product);
//     return Recipe.find()
// })
// .then()
// .then( () => mongoose.connection.close() )
// .catch(error => console.log("error creating a product in DB", error));



const data = [{
        title: "Lambrusco Deluxe",
        price: 22,
        tags: ["drink"]
    },
    {
        title: "Beer",
        price: 2,
        tags: ["drink"]
    }
];

Product.create(data)
    .then(product => console.log("a new product was created", product))
    .catch(error => console.log("error creating a product in DB", error));



// mongoose.connection.close()

// Product.find({price: {$gt: 30}})
//     .then( (productsArr) => {
//         console.log("products with price above 30....", productsArr)
//     })
//     .catch( err => console.log("error getting products from DB", err));


//     Product.updateMany({store: "online"})
//     .then( response => console.log("products updated successfully"))
//     .catch( err => console.log("error updating products from DB", err));



// Add the tag "best-sellers" to all products
// Product.updateMany({price: {$lt: 5}}, {$push: {tags: "best-sellers"}})
// .then( response => console.log("products updated successfully"))
// .catch( err => console.log("error updating products from DB", err));



Product.findByIdAndUpdate('62614a64395ff42f2e2c5701', { price: 40 })
    .then(productFromDB => console.log("products updated successfully", productFromDB))
    .catch(err => console.log("error updating products from DB", err));