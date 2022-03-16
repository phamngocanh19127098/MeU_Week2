import {Sequelize} from 'sequelize';

export default new Sequelize('meuweek2_database', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres',
   

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  });
