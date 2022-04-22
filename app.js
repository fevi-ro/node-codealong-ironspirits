const express = require('express');
const Product = require('./models/Product.model');
const app = express();
const mongoose = require('mongoose');
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static('public')); // must be placed allways after const app = express();

//  <img src="/images/mouri.jpg" alt="ironborn" />      alt syntax of line 18
//app.get(path, code);
//path for homepage "/"

mongoose
    .connect('mongodb://localhost/ironborn-ecommerce')
    .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(err => console.error('Error connecting to mongo', err));

/* Routes */

app.get("/", (req, res, next) => {
    res.render("home");
});



app.get("/about", (req, res, next) => {
    res.render("about");
});


app.get("/contact", (req, res, next) => {


    res.render("contact");
});

app.get("/limoncello", (req, res, next) => {

    // res.render("view", info);
    Product.findOne({ title: 'Limoncello' })
        .then((productDetails) => {
            res.render("product", productDetails);
            console.log('product found')
        })
        .catch(error => console.log(error));


});

app.get("/whisky", (req, res, next) => {

    //res.render("view", info);
    Product.findOne({ title: 'Single Malt Whisky Yamakazi' })
        .then((productDetails) => {
            res.render("product", productDetails);
            console.log(productDetails)
        })
        .catch(error => console.log(error));
});



app.get("/tequila", (req, res, next) => {

    // res.render("view", info);
    Product.findOne({ title: "Tequila Don Julio" })
        .then((productDetails) => {
            res.render("product", productDetails);
            console.log('product found')
        })
        .catch(error => console.log(error));
});




app.listen(3001, () => {
    console.log('server listening to requests');
});