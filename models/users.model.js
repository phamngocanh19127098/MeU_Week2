
import pool from "../utils/db.js"
import bcrypt from 'bcrypt'
import { QueryTypes } from "@sequelize/core";
import Users from "./generate.model.js";
import database from "../config/database.js";
export default {
    async addNewUser(user){

        const hashedPassword = await bcrypt.hash(user.password,10);
       
        let { name, email, password } = user;
        password = hashedPassword;
        const check = Users.create({
            name,
            email,
            password,         
          })
            .then(result => {})
            .catch(error => {})
        return check;
    },
    async findUserByEmail (email){
        const userByEmail = await database.query(
            'SELECT * FROM user_tables WHERE email = :search_name',
            {
              replacements: { search_name: email },
              type: QueryTypes.SELECT
            }
          );
          return userByEmail;
    },
    async findAllUser(size,offset){
        const users = await database.query(
            'SELECT * FROM user_tables LIMIT :size OFFSET :off_set ',
            {
                replacements:{off_set:offset,size:size},
                type:QueryTypes.SELECT
            }
        )
        return users;
    },
   
    async findUserById(id){
        const userById = await database.query(
            'SELECT * FROM user_tables WHERE id = :id',
            {
              replacements: { id: id },
              type: QueryTypes.SELECT
            }
          );
          return userById;
    },
     async activeUser (id){
      
       await database.query('UPDATE user_tables SET verified = 1 WHERE id = :id',{
           replacements:{id:id},
           type: QueryTypes.UPDATE,

       })
       
     }
}