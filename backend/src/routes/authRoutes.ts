import express from "express" 
import { checkAuth, signin, signup } from "../controller/authController.js";
import { Middleware } from "../Middleware/middleware.js";
const router  = express.Router()


router.post('/signup',signup)
router.post('/signin',signin)
router.get('/checkAuth',Middleware,checkAuth)

export default router;