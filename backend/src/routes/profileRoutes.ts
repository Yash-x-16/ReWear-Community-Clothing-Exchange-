import express from "express" 
import { Middleware } from "../Middleware/middleware"
import { checkAuth, updateProfile } from "../controller/authController"
const router = express.Router()

router.post('/updateProfle',Middleware,updateProfile)
router.get('/profile',Middleware,checkAuth)

export default router 