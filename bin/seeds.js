const mongoose = require('mongoose');

const Product = require("../models/Product.model");

mongoose
    .connect('mongodb://localhost/ironborn-ecommerce')
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));



const Products = [{
        title: "Limoncello",
        price: 20,
        imgFile: "mourisofa.jpg"
    },
    {
        title: "Single Malt Whisky Yamakazi",
        price: 105,
        imgFile: "mourimou.jpg"
    },
    {
        title: "Tequila Don Julio",
        price: 35,
    },
    {
        title: "Lambrusco",
        price: 18,
    }
];


Product.insertMany(Products)
    .then((response) => { console.log('products created', response) })
    .catch((error) => { console.log(error) })
    .finally(() => {
        mongoose.connection.close();
    });