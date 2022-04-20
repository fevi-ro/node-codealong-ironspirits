const express = require('express');
const app = express();

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

app.use(express.static('public')); // must be placed allways after const app = express();

//  <img src="/images/mouri.jpg" alt="ironborn" />      alt syntax of line 18
//app.get(path, code);
//path for homepage "/"


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

    const data = {
        title: "Limoncello",
        price: 10,
        imageFile: "mouri 1 y.jpg",
        stores: ["Online", "Albacete", "Freiburg", "Amsterdam"]
    }

    res.render("product", data);
});

app.get("/whisky", (req, res, next) => {

    // res.render("view", info);

    const data = {
        title: "Whisky",
        price: 80,
        imageFile: "mourimou.jpg",
        stores: ["Online", "Berlin", "Paris", "Rome"]
    }

    res.render("product", data);
});

app.get("/tequila", (req, res, next) => {

    // res.render("view", info);

    const data = {
        title: "Tequila",
        price: 20,
        imageFile: "mourisofa.jpg",
        stores: ["Online", "Athens", "Santorini", "Porto"]
    }

    res.render("product", data);
});




app.listen(3001, () => {
    console.log('server listening to requests');
});