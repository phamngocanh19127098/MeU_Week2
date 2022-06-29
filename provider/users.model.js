import initModels from "../models/init-models.js";
import database from "../config/database.js";
import product from "../models/product.js";
import orderDetail from "../models/orderDetail.js";
import order from "../models/order.js";
const models = initModels(database);
export default {
    async findAllUser(offset, size){
        const users= await models.user.findAll({offset: offset, limit: size});
      
        for(var i = 0 ;i<users.length;i++){
            delete users[i].dataValues.password;
        }
        return users;
    },

    async findUserByUsername(username){
        return await models.user.findOne({
            where : {
                login_name : username,
            }
        });
    },

    async addNewUser(user){
        console.log(user);
        await models.user.create({
            name:user.name,
            login_name:user.login_name,
            role_name : user.role_name,
            address : user.address,
            password:user.password
        });
    },

    async manage(){
        let data = await models.user.findAll({
            where:{
                role_name : 'Shop'
            },
            include:[
                {
                    model: product,
                    as : 'products',
                    attributes: ['price', 'image_url'],
                    include : [
                        {
                            model: orderDetail,
                            as : 'order_details',
                            attributes : ['quantity'],
                            include : [
                                {
                                    model: order,
                                    as : 'order',
                                    attributes : ['total_price','time']
                                }
                            ]

                        },
                    ]
                },
            ]
        })
        return data;
    }
}