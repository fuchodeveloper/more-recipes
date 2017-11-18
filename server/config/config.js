const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  development: {
    username: 'postgres',
    password: 'administrator',
    database: 'more-recipes2',
    host: '127.0.0.1',
    port: 5433,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'administrator',
    database: 'tests',
    host: '127.0.0.1',
    port: 5433,
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DB_URL'
  }
};
