const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
const config = require("config");


mongoose.connect(`${config.get("MONGO_URI")}/scatch`)
.then(function(){
    dbgr("mongodb connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;
