import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import { router as user} from "./routes/user.js";
import { router as product } from "./routes/product.js"
const app = express()
const port = 5500

// Config
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

// DB conection
mongoose.connect(process.env.MONGO_URI)
    .then(console.log('MongoDB connected...'))

// Routes
app.use("/user", user)
app.use("/product", product)

app.listen(port, () => {
    console.log(`Server running on port:${port}`)
})


