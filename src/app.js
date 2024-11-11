import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import admins from './routes/admins.js';
import games from './routes/games.js';
import history from './routes/history.js';
import resources from './routes/resources.js';

const app = express();
const port = process.env.PORT || 10000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Подключаем маршруты
app.use('/api', admins);
app.use('/api', games);
app.use('/api', history);
app.use('/api', resources);

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});