import initModels from "../models/init-models.js";
import database from "../config/database.js";
const models = initModels(database);
export default {
    async findAllProduct(offset, size){
        return  await models.product.findAll({offset: offset, limit: size});
    },

    async findAllProductById(id){
        return  await models.product.findOne({
            where:{
                id:id,
            }
        });
    },

    async createProduct(product, userId){
        let {name, price, stock, image_url}= product;
        await models.product.create({
            user_id : userId,
            name,
            price,
            stock,
            image_url,
        })
    },

    async update(product, userId){

        let {name, price, stock, image_url, id}= product;

        await models.product.update({
            name,
            price,
            stock,
            image_url,
        },{
            where:{
                user_id : userId,
                id,
            }
        })
    }

}