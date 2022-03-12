import express from "express";

import crypt from '../utils/crypt.js'
import mailGun from 'mailgun-js'
import userModel from '../models/users.model.js'
import { authenticateToken } from "../middlewares/authorization.js";
const router = express.Router();
const hashedDomain = '7dcecb51f53178edd7a6de01581da0b877ac22c459c6599c460cf8a438e5a2e62858b1e92c828e3d257fc9a16afb4a6aff40479f8e45184330814068f12e4764'
const hashedApi = '87188d3dedb0558b49e8baa28b414ee3175caac3e27f94bd73b5fdb0f0651bb206ecb4bfea83a060032bb0ce3fd864db'
const mailgun = mailGun({apiKey:crypt.decrypt(hashedApi),domain:crypt.decrypt(hashedDomain)});
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
        const user = req.body;
        const newUser = await userModel.addNewUser(user);
        console.log(newUser);
        const data = {
            from: 'Anh Pham HCMUS@fit.com',
            to: newUser.user_email,
            subject: 'Comfirm your mail',
            text: 'From MeU solutions \n'
                    +`Verify your mail here http://localhost:3000/api/users/verify/${newUser.user_id}`
                    +'\n Thank for your joining'
          };    
        mailgun.messages().send(data);
        res.json({message:"Please comfirm your mail"});
    } catch (error) {
         console.log(error.message);
        res.status(500).json({error : error.message}) 
    }
})

router.get('/verify/:user_id',async (req,res)=>{
    const user_id = req.params.user_id||-1;
    console.log(user_id);
    try {
        if(user_id===-1){
            return res.json({message:"Invalid url"});
        }
        
        const user = await  userModel.findUserById(user_id);
        console.log(user[0].user_verified);
        if(user.length===0){
            return res.json({message:"User does not exist"});
        } else  if (user[0].user_verified==='0'){
            
            const setUser = await userModel.activeUser(user_id);
            return res.json({message:'Verify Success'});
        }
        else 
            return res.json({message:'This account is verified'});
    } catch (error) {
        res.status(404).json({message:'Invalid id'})
    }
    
})
export default router;