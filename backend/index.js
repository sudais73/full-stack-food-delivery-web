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

// ✅ Allow only my frontend domain
app.use(cors({
  origin: "https://full-stack-food-delivery-web.vercel.app",  // my deployed frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}))

// Middleware
app.use(express.json())

// API endpoints
app.use("/api/food", foodRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req,res)=>{
    res.send("Welcome men")
})

app.listen(PORT, ()=>console.log(`server is listening on port: ${PORT}`))
