import pg from 'pg';
const {Pool} = pg;

const localPoolConfig = {
    user:'postgres',
    password: '123',
    host:'localhost',
    port : '5432',
    database : 'meuweek2_database'
}

// const poolConfig = process.env.DATABASE_URL ? {
//     connectionString :process.env.DATABASE_URL,
//     ssl:{rejectUnathorized:false}
// } : localPoolConfig;
const pool = new Pool(localPoolConfig);

export default pool;
