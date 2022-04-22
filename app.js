const express = require('express');
const Product = require('./models/Product.model');
const app = express();
const mongoose = require('mongoose');
// 1. require the body-parser
const bodyParser = require('body-parser');
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static('public')); // must be placed allways after const app = express();
// 2. let know your app you will be using it
app.use(bodyParser.urlencoded({ extended: true }));
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

//filter products with max price 50
app.get("/products", (req, res, next) => {

    let filter;
    const max = req.query.maxPrice;

    if (max === undefined) {
        filter = {};
    } else {
        filter = { price: { $lte: max } }
    }

    Product.find(filter)
        .then(productsArr => {
            res.render("productList", { products: productsArr });
        })
        .catch(error => console.log("error getting products from DB", error));
})




app.post("/products/new", (req, res, next) => {
    const newProduct = {
        title: req.body.title,
        price: req.body.price
    }

    Product.create(newProduct)
        .then(newProduct => {
            res.redirect("/products"); //redirect to the products page
        })
        .catch(error => {
            console.log("error creating new product", error);
            res.redirect("/"); //@todo: display a nice error msg
        });
})


/*  GET each product from DB
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
*/



//GET all products from db
//productId is a placeholder, it's a name we choose
app.get("/products/:productId", (req, res, next) => {

    Product.findById(req.params.productId)
        .then((productDetails) => {
            res.render("product", productDetails);
        })
        .catch(error => console.log(error));
})

//


app.listen(3001, () => {
    console.log("server listening to requests...")
});