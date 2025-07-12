import express from "express"
import dotenv from "dotenv"

const app =express()

app.use(express.json())

dotenv.config() 


const port = process.env.PORT


app.listen(port,()=>{
    console.log(`server is running at the port ${port}`)
})
