import {DataTypes} from 'sequelize';
import database from '../config/database.js';
const User_roles = database.define('user_roles',{
    id:{
        type : DataTypes.UUID,
        allowNull:false,
        primaryKey:true,
        references:{
          model:'user_tables',
          key:'id'
        }
    },
    role:{
        type:DataTypes.STRING,
        defaultValue:'Normal'
        
    }
  })
 
  


  export default User_roles;