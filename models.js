import sequelizeAuto from 'sequelize-auto'
import database from './config/database.js';
const auto = new sequelizeAuto('meuweek2_database', 'postgres', '123',{
    lang:'esm',
    host: 'localhost',
    dialect: 'postgres',
    caseModel: 'c', 
    caseFile: 'c', 
    singularize: true, 
    additional: {
        timestamps: false
        
    },
    tables: ['user_tables', 'user_roles'],
    
    
   });
  auto.run();