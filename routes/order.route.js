import express from "express";
import {authenticateToken} from "../middlewares/authorization.js";
import model from "../provider/orders.model.js";
import userRole from "../models/userRole.js";
const router = express.Router();

router.post('/add',authenticateToken, async(req,res)=>{
    /* #swagger.security = [{
                             "bearerAuth": []
                       }] */
    let user = req.user;

    if(user.role_name !== 'User'){
        return res.json({
            statusCode : 500,
            message: "Chỉ có người dùng mới có quyền mua hàng.",
        })
    }

    let {total_price, productList} = req.body;
    await model.createOrder(req.body, req.user.id);
    res.status(200).json({
        statusCode: 200,
        message : "Tạo đơn hàng thành công."
    })
});

router.get('/list',authenticateToken,  async (req,res)=>{
    /* #swagger.security = [{
                            "bearerAuth": []
                      }] */
    const page = req.query.page || 1;
    const size = req.query.size || 5;
    const offset = (page - 1) * size;

   let data =  await  model.getListOrder(req.user.id, offset, size);
    return res.status(200).json({
        statusCode : 200,
        message : 'Lấy danh sách các hóa đơn thành công',
        data,
    })

})

router.get('/detail/:id',authenticateToken,  async (req,res)=>{
    /* #swagger.security = [{
                            "bearerAuth": []
                      }] */

    let id = req.params.id;
    let data =  await  model.getOrderDetail(req.user.id, id);
    if(!data){
        data= {};
    }
    return res.status(200).json({
        statusCode : 200,
        message : 'Lấy chi tiết hóa đơn thành công',
        data,
    })

});

export default router;