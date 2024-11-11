import express from 'express';
import { createResource, getResources, updateResource, deleteResource } from '../controllers/resources.js';

const router = express.Router();

router.post('/resources', createResource); // Создание нового элемента
router.get('/resources', getResources); // Получение всех элементов
router.put('/resources/:id', updateResource); // Обновление элемента
router.delete('/resources/:id', deleteResource); // Удаление элемента

export default router;
