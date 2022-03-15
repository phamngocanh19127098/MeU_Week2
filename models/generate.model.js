import {DataTypes} from 'sequelize';
import database from '../config/database.js';


try {
  await database.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const Users = database.define('user_tables', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verified: {
    type: DataTypes.STRING,
    defaultValue:0
  }
});
Users.sync().then(() => {
  console.log('table created');
});





export default  Users;
