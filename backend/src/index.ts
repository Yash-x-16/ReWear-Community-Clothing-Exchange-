import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"

const app =express()

app.use(express.json())

dotenv.config() 


const port = process.env.PORT


app.use('/api/auth',authRoutes)
app.listen(port,()=>{
    console.log(`server is running at the port ${port}`)
})
