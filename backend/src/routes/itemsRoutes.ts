import express from "express" 
import { Middleware } from "../Middleware/middleware"
import { createItem, deleteItem, getAllItems, getItemById } from "../controller/itemsController"

const router = express.Router()

router.post('/createItem',Middleware,createItem)
router.delete('/deleteItem',Middleware,deleteItem)
router.get('/items',Middleware,getAllItems)
router.get('/:id',Middleware,getItemById)

export default router