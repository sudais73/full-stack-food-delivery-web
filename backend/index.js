import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js';
import 'dotenv/config'
import cloudinaryConfig from './config/cloudinary.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
connectDB()
cloudinaryConfig()
const app = express()
const PORT = 5000;

// middleware//
app.use(express.json())
app.use(cors())

// api endpoints//
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req,res)=>{
    res.send("Wel Come men")
})

app.listen(PORT, ()=>console.log(`server is listening to port:${PORT} `))