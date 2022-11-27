function runDotEnv() {
  if (process.env.ENV === 'development') {
    import('dotenv').then(dotenv => dotenv.config({ path: '.env' }));
  }
}

runDotEnv();

const config = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456' ,
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost' ,
    logging: console.log,
    dialect: 'postgres',
  },
  test: {
    username: process.env.DB_TEST_USER || 'postgres',
    password: process.env.DB_TEST_PASSWORD || '123456',
    database: process.env.DB_TEST_TEST_HOST || '127.0.1',
    port: process.env.DB_TEST_PORT || '5432',
    logging: false,
    dialect: 'postgres',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    logging: false,
    dialect: 'postgres',
  },
};

export default config;
