const express = require("express");
const app = express();

const cors = require("cors");
const {default : mongoose} = require("mongoose");

//app.use(cors({origin :true}));

app.get("/",(req,res) => {
    return res.json("hello there......")
})


mongoose.connect(process.envDB_STRING, {useNewUrlParser : true});
mongoose.connection
.once("open" , ()=>console.log())

app.listen(3000, ()=> console.log("Listening to the port 3000"));