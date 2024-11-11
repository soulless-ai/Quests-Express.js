import express from 'express';
import { createAdmin, getAdmins, updateAdmin, deleteAdmin } from '../controllers/admins.js';

const router = express.Router();

router.post('/admins', createAdmin); // Создание нового элемента
router.get('/admins', getAdmins); // Получение всех элементов
router.put('/admins/:id', updateAdmin); // Обновление элемента
router.delete('/admins/:id', deleteAdmin); // Удаление элемента

export default router;
