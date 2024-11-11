import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import admins from './routes/admins.js'; // Импортируем маршруты
import games from './routes/games.js'; // Импортируем маршруты
import history from './routes/history.js'; // Импортируем маршруты
import resources from './routes/resources.js'; // Импортируем маршруты

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(json());

// Подключаем маршруты
app.use('/api', admins); // Все маршруты начинаются с /api
app.use('/api', games);
app.use('/api', history);
app.use('/api', resources);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});