const express = require("express");
const app = express();

app.use(express.static('public')); // must be placed allways after const app = express();

//  <img src="/images/mouri.jpg" alt="ironborn" />      alt syntax of line 18
//app.get(path, code);
//path for homepage "/"

app.get("/about", (req, res, next) => {
    //   console.log(req);
    //  console.log("a request on the ABOUT page was received");
    // res.send("this is your about page");


    res.sendFile(__dirname + '/views/about.html');
});


app.get("/contact", (req, res, next) => {


    res.sendFile(__dirname + '/views/contact.html');
});



app.listen(3001, () => {
    console.log('server listening to requests');
});