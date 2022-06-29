import express from "express";
import crypt from "../utils/crypt.js";
import dotenv from "dotenv";
import { authenticateToken } from "../middlewares/authorization.js";
import nodemailer from "nodemailer";
dotenv.config();
const router = express.Router();
import model from "../provider/users.model.js";
import usersModel from "../provider/users.model.js";

router.get("/", authenticateToken, async (req, res) => {
    // #swagger.description = 'Get all users (Bearer+space+access token to authorize)'
    /* #swagger.security = [{
              "bearerAuth": []
        }] */
  try {

    const page = req.query.page || 1;
    const size = req.query.size || 5;
    const offset = (page - 1) * size;
    const users = await model.findAllUser(offset, size);
   
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/add-user',authenticateToken ,async (req, res)=>{
  /* #swagger.security = [{
             "bearerAuth": []
       }] */

  if(!req.user.role_name|| req.user.role_name !== 'Admin'){
    return res.status(500).json({
      statusCode : 500,
      message : 'Người dùng không có quyền tạo người dùng mới.'
    })
  }

  let {name, login_name, role_name, address, password} = req.body;

  let user = await model.findUserByUsername(login_name);

  if(user){
    return res.status(500)
        .json({
          statusCode: 500,
          message: "Tên đăng nhập đã tồn tại."
        })
  }

  try{
      await model.addNewUser(req.body);
  }
  catch (e) {

  }

  return res.status(200)
      .json({
        statusCode: 200,
        message : "Thêm mới người dùng thành công",
      })
})

router.get('/list-shop',authenticateToken, async (req,res)=>{
    /* #swagger.security = [{
           "bearerAuth": []
     }] */
    if(!req.user.role_name|| req.user.role_name !== 'Admin'){
        return res.status(500).json({
            statusCode : 500,
            message : 'Người dùng không có quyền tạo người dùng mới.'
        })

    }
    let data = await model.manage();
    return res.status(200).json({
        statusCode: 200,
        message: 'Lấy danh sách shop thành công.',
        data,
    })


})

export default router;
