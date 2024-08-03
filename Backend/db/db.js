const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://htpcodes:BBS4O9lF3H1I9tfS@cluster0.uyuezmt.mongodb.net/")

//define Schema
const userSchema = mongoose.Schema({
    username : String,
    password : String,
    firstName : String,
    lastName : String

})

//
const User = mongoose.model("User",userSchema)

module.exports ={
    User
}