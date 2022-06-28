import initModels from "../models/init-models.js";
import database from "../config/database.js";
import orderDetail from "../models/orderDetail.js";
import product from "../models/product.js";
const models = initModels(database);

export default {
    async createOrder(order, userId){

        let {total_price, productList} = order;

        let preparedOrder = await models.order.create({
            user_id : userId,
            total_price,
        });

        if(!productList){
            return;
        }
        try{
            for( let i = 0 ; i < productList.length; i++){
                await models.orderDetail.create({
                    order_id : preparedOrder.id,
                    quantity :  productList[i].quantity,
                    product_id : productList[i].product_id,
                })
            }
        }
        catch (e) {

        }

    },

    async getListOrder(userId, offset, size){
        let data =   await models.order.findAll({
            offset : offset,
            limit : size,
            include : {
                model : orderDetail,
                as :'order_details',
                attributes : ['quantity'],
                include :[{
                    model : product,
                    as : 'product',
                    attributes : ['name'],
                }]
            },
        });
        return data;
    },
    async getOrderDetail(userId, orderId){
        let data =   await models.order.findOne({
            where:{
                id : orderId,
            },
            include : {
                model : orderDetail,
                as :'order_details',
                attributes : ['quantity'],
                include :[{
                    model : product,
                    as : 'product',
                    attributes : ['name', 'price', 'image_url'],
                }]
            },
        });
        return data;
    },

}