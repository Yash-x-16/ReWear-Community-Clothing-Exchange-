import {v2 as cloudinary} from "cloudinary" 
import { config } from "dotenv"

config()

cloudinary.config({
    api_key :process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLUDINARY_SECRET,
    api_name:process.env.CLOUDINARY_API_NAME
})

export default cloudinary