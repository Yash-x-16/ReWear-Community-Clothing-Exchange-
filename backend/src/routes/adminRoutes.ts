import express from "express"
import { Middleware } from "../Middleware/middleware"
import { approveItem, getPendingItems, rejectItem } from "../controller/adminController"


const router   = express.Router()

router.get('/pending',Middleware,getPendingItems)
router.post('/approve',Middleware,approveItem)
router.post('/reject',Middleware,rejectItem)


export default router