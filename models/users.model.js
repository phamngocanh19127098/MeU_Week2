
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

    async findAllUser(user){
        const users = await pool.query('SELECT * FROM users');
        return users;
    },
    async findUserByEmail(email){
        const users = await pool.query('SELECT * FROM users WHERE user_email =$1',  [email]);
        return users;
    }
}