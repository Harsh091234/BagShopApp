const userModel = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const usermodel = require("../models/usermodel");

module.exports.registerUser = async (req, res) => {


    try {
        let { email, password, fullName } = req.body;
        let user = await userModel.findOne({email: email});
        if(user) return res.status(401).send("you already have account please login");    

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                let user = await userModel.create({
                    email,
                    password: hash,
                    fullName
                });
                let token = generateToken(user);
                res.cookie("token", token);
                res.send("user created successfully");
            })
        });


    } catch (error) {
        console.log(error.message);
    }

}

module.exports.loginUser = async(req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email});
    if(!user) return res.send("email or password incorrect");

    bcrypt.compare(password, user.password, (err, result) => {
       if(result){
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
       }
       else{
        return res.send("email or password incorrect");
       }
    })

}

module.exports.logout = (req, res) => {
    res.cookie("token", "");
    res.redirect("/");
}