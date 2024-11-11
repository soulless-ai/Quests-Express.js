import pkg from 'pg'; // Импортируйте модуль как default
const { Pool } = pkg;  // Теперь извлекаем Pool из импортированного объекта

import dotenv from 'dotenv';

// Загружаем переменные из .env
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((error) => console.error('PostgreSQL connection error:', error));

export default pool;