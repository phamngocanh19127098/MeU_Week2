import express from "express";
import pool from '../utils/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Route } from "express";
import router from "./users.route.js";
import usersModel from "../models/users.model.js";
import { jwtTokens } from "../utils/jwt-heplers.js";



router.post('/login',async (req,res)=>{

    try {
        const {email,password} = req.body;
        const users = await usersModel.findUserByEmail(email);
        console.log(users);
        if(users.length===0){
            return res.status(401).json({error:"Email or password is incorrect"});
        }
       const validPassword = await bcrypt.compare(password,users[0].password);
       if(!validPassword)
            return res.status(401).json({error:"Email or password is incorrect"})
        
        const tokens = jwtTokens(users[0]); 
        res.json(tokens);
        return res.status(200).json('Success');
    } catch (error) {
        
    }
})



export default router;