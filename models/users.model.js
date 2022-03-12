
import pool from "../utils/db.js"
import bcrypt from 'bcrypt'
export default {
    async addNewUser(user){
        const hashedPassword = await bcrypt.hash(user.password,10);
        const newUser = await pool.query(
            'INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *'
            , [user.name, user.email, hashedPassword]);
        
        const newRole = await pool.query(
                'INSERT INTO user_roles (user_id,user_role) VALUES ($1,$2) RETURNING *'
                , [newUser.rows[0].user_id,'normal']);

        return newUser.rows[0];
    },

    async findAllUser(size,offset){
        const users = await pool.query('SELECT * FROM users LIMIT $1 OFFSET $2',[size,offset]);
        return users;
    },
    async findUserByEmail(email){
        const users = await pool.query('SELECT * FROM users WHERE user_email =$1',  [email]);
        return users;
    },
    async findUserById(user_id){
        const user = await pool.query('SELECT * FROM users,user_roles WHERE' 
        +' users.user_id = user_roles.user_id AND users.user_id = $1',[user_id]);
        return user.rows;
    },
     async activeUser (user_id){
         const user = await pool.query('UPDATE users SET user_verified = $1 WHERE user_id = $2 ',['1',user_id]);
        return user.rows;
     }
}