const dotenv = require("dotenv")
dotenv.config()

const express = require('express')
const cors=require('cors')
const connectDB=require('./src/config/db')
const app = express();
const userRoutes = require('./src/routes/userRoutes')
const sweetRoutes = require("./src/routes/sweetRoutes")

app.use(express.json());
app.use(cors());


//Connnection to db
connectDB();


//Middleware
app.use("/api/auth", userRoutes)
app.use("/api/sweets", sweetRoutes)


//route
app.get("/",(req,res)=>{
    res.send("API is running")
})


//starting the server
const PORT= process.env.PORT || 5000
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`);
})