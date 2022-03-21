import bcrypt from "bcrypt";

import router from "./users.route.js";
import { jwtTokens } from "../utils/jwt-heplers.js";
import model from "../models/users.model.js";
import jwt from 'jsonwebtoken'
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await model.findUserByEmail(email);

    if (users.length === 0) {
      return res.status(401).json({ error: "Email or password is incorrect" });
    }
    const validPassword = await bcrypt.compare(password, users[0].password);
    if (!validPassword)
      return res.status(401).json({ error: "Email or password is incorrect" });

    const tokens = jwtTokens(users[0]);
    res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true})
    res.json(tokens);
    return res.status(200).json("Success");
  } catch (error) {}
});
router.get('/refresh_token',(req,res)=>{
  try {
    const refreshToken=req.cookies.refresh_token;
    if(refreshToken===null){
      res.status(401).json( {error:'No refresh token'})
    }
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(error,user)=>{
      if(error)
        return res.status(403).json({error:error.messate})
      let tokens = jwtTokens(user);
      res.cookie('refresh_token',tokens.refreshToken,{httpOnly:true});
      res.json(tokens);

    })
  } catch (error) {
    return res.status(403).json({error:error.messate})
  }
})

export default router;
