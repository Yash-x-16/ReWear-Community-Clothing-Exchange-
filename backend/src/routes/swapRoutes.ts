import express from "express" 
import { Middleware } from "../Middleware/middleware";
import { getUserSwaps, requestSwap, respondToSwap } from "../controller/swapController";

const router =express.Router()

router.post('/respond',Middleware,respondToSwap)
router.get('/allswap',Middleware,getUserSwaps) 
router.post('/request',Middleware,requestSwap)

export default router ; 