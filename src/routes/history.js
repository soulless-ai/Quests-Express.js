import express from 'express';
import { createHistory, getHistories, getHistoryByDate, updateHistory, deleteHistory } from '../controllers/history.js';

const router = express.Router();

router.post('/history', createHistory); // Создание нового элемента
router.get('/history', getHistories); // Получение всех элементов
router.get('/history/date', getHistoryByDate); // Получение элементов по дате
router.put('/history/:id', updateHistory); // Обновление элемента
router.delete('/history/:id', deleteHistory); // Удаление элемента

export default router;
