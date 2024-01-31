const express = require("express");
const app = express();
require("dotenv/config")

const cors = require("cors");
const {default : mongoose} = require("mongoose");

app.use(cors({origin :true}));

app.use(express.json());

app.get("/",(req,res) => {
    return res.json("hello there......")
})

//user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

//artist

const artistsRoutes=require("./routes/artist");
app.use("/api/artist/",artistsRoutes);

//album

const albumRoutes=require("./routes/albums");
app.use("/api/albums/",albumRoutes);


//song
const songRoutes=require("./routes/songs");
app.use("/api/songs/",songRoutes);



mongoose.connect(process.env.DB_STRING, {useNewUrlParser : true});
mongoose.connection
.once("open" , ()=>console.log())
.on("error", (error)=>{
    console.log(`Error : ${error}`);
} )

app.listen(3000, ()=> console.log("Listening to the port 3000"));
