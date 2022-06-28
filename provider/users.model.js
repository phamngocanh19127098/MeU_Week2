import initModels from "../models/init-models.js";
import database from "../config/database.js";
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
}