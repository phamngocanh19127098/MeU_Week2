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
        const newUser = await userModel.addNewUser(req.body);
        console.log(newUser);
        const data = {
            from: 'MeU Solution HCMUS@fit.com',
            to: newUser.user_email,
            subject: 'Comfirm your mail',
            text: 'From MeU solutions \n'
                    +`Verify your mail here http://localhost:3000/api/users/verify/${newUser.user_id}`
                    +'\n Thank for your joining'
          };    
        mailgun.messages().send(data);
        res.json(newUser);
    } catch (error) {
         console.log(error.message);
        res.status(500).json({error : error.message}) 
    }
})
export default router;