import express from "express"
import model from "../provider/products.model.js";
import {authenticateToken} from "../middlewares/authorization.js";

const router = express.Router();

router.get('/',async (req,res)=>{

        const page = req.query.page || 1;
        const size = req.query.size || 5;
        const offset = (page - 1) * size;
        const products = await model.findAllProduct(offset, size);

        return res.json(products);
})

router.get('/:id',async (req,res)=>{

        let id = req.params.id;
        const products = await model.findAllProductById(id);
        if(!products){
                return res.status(404).json({
                        statusCode: 404,
                        message:"Không tìm thấy sản phẩm."
                })
        }
        return res.json(products);
})

router.post('/',authenticateToken,async (req,res)=>{
        /* #swagger.security = [{
                  "bearerAuth": []
            }] */
        if( !req.user|| req.user.role_name !=='Shop')
                return res.status(403).json({
                        statusCode: 403,
                        message:"Nguời dùng không có quyền tạo sản phẩm."
                })
        let userId = req.user.id;
        let {name, price, stock, image_url}= req.body;
        try {
                await model.createProduct(req.body,userId);
                return  res.status(200).json({
                        statusCode : 200,
                        message: "Tạo sẩn phẩm thành công."
                })
        }
        catch (e) {
                console.log(e)
                return res.status(500).json({
                        statusCode: 500,
                        message: "Lỗi trong quá trình tạo sản phẩm."
                })
        }

})

router.put('/',authenticateToken, async (req, res)=>{
        /* #swagger.security = [{
                          "bearerAuth": []
                    }] */
        if( !req.user|| req.user.role_name !=='Shop')
                return res.status(403).json({
                        statusCode: 403,
                        message:"Nguời dùng không có chỉnh sửa sản phẩm."
                })
        let userId = req.user.id;
        let { id, name, price, stock, image_url }= req.body;
        try {
                await model.update(req.body,userId);
                return  res.status(200).json({
                        statusCode : 200,
                        message: "Chỉnh sửa sẩn phẩm thành công."
                })
        }
        catch (e) {
                return res.status(500).json({
                        statusCode: 500,
                        message: "Lỗi trong quá trình chỉnh sửa sản phẩm."
                })
        }
})
export default router;