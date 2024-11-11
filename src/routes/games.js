import express from 'express';
import { createGame, getGames, updateGame, deleteGame } from '../controllers/games.js';

const router = express.Router();

router.post('/games', createGame); // Создание нового элемента
router.get('/games', getGames); // Получение всех элементов
router.put('/games/:id', updateGame); // Обновление элемента
router.delete('/games/:id', deleteGame); // Удаление элемента

export default router;
