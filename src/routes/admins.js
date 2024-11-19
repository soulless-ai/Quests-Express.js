import express from 'express';
import { createAdmin, getAdmins, updateAdmin, deleteAdmin, getUsers } from '../controllers/admins.js';

const router = express.Router();

router.post('/admins', createAdmin); // Создание нового элемента
router.get('/admins', getAdmins); // Получение элементов !big_admins
router.get('/admin_users', getUsers); // Получение элементов big_admins
router.put('/admins/:id', updateAdmin); // Обновление элемента
router.delete('/admins/:id', deleteAdmin); // Удаление элемента

export default router;
