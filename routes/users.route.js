import express from "express";

import crypt from "../utils/crypt.js";

import userModel from '../models/users.model.js'
import { authenticateToken } from "../middlewares/authorization.js";
const router = express.Router();




router.get('/', authenticateToken, async (req,res)=>{
    try {
        const users= await userModel.findAllUser();
        return res.json({users: users.rows});
    } catch (error) {
        res.status(500).json({error : error.message})
    }

});

router.post('/register',async (req,res)=>{
   
    try {
        const newUser = await userModel.addNewUser(req.body);
          
        res.json(newUser);
    } catch (error) {
         console.log(error.message);
        res.status(500).json({error : error.message}) 
    }
})
export default router;