import express from "express" 
import { Middleware } from "../Middleware/middleware"
import { updateProfile } from "../controller/authController"
const router = express.Router()

router.post('/updateProfle',Middleware,updateProfile)
router.get('/profile',Middleware)

export default router 