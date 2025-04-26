const express =  require("express");
const router = express.Router();
const ownersModel = require("../models/ownermodel");



if(process.env.NODE_ENV === "development"){
    router.post("/create", async(req, res) => {
        let owners = await ownersModel.find();
        if(owners.length > 0){
            return res.status(504).send("you dont have permission to create new user");
        }
        let {fullname, email, password} = req.body;

        let createdOwner = await ownersModel.create({
            fullname,
            email,
            password
        });

        res.status(201).send(createdOwner);
    });
}

router.get("/admin", (req, res) => {
    let success = req.flash("success");
    res.render("createproducts", {success});
});

module.exports = router;