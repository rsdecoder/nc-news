const { Pool } = require('pg');
const ENV = process.env.NODE_ENV || 'development';

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('PGDATABASE not set');
}
const config = {}

if (ENV === 'production'){
  config.connectString = process.env.DATABASE_URL;
  config.max = 2;
} 

console.log(`The database is ${process.env.PGDATABASE}`);

module.exports = new Pool(config);
