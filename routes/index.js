const express =  require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");
const productModel = require("../models/productmodel");
const usermodel = require("../models/usermodel");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", {error, loggedin: false});
});

router.get("/shop", isLoggedIn, async(req, res) => {
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", {products, success}); 
});

router.get("/cart", isLoggedIn, async(req, res) => {
    let user = await usermodel.findOne({email:  req.user.email})
    .populate("cart");
    let bill = Number(user.cart[0].price) + 20 + Number(user.cart[0].discount);
    res.render("cart", {user, bill}); 
});


router.get("/addtocart/:productid", isLoggedIn, async(req, res) => {
    let user = await usermodel.findOne({email: req.user.email}); 
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "added to cart");
    res.redirect("/shop");
});

router.get("/logout", isLoggedIn, async(req, res) => {
    let products = await productModel.find();
    res.render("shop", {products});
});


module.exports = router;