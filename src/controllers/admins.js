import pool from '../db/database.js';

// Create (создать новый элемент)
export const createAdmin = async (req, res) => {
  const { email, big_admin } = req.body;
  try {
    const result = await pool.query('INSERT INTO admins (email, big_admin) VALUES ($1, $2) RETURNING *', [email, big_admin]);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read (получить всех пользователей, у которых big_admin = true)
export const getAdmins = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admins WHERE big_admin = true');
    res.status(200).send(result.rows); // Отправляем массив администраторов
  } catch (error) {
    res.status(400).send(error); // Отправляем ошибку в случае сбоя
  }
};

// Read (получить всех пользователей, у которых big_admin = false)
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admins WHERE big_admin = false');
    res.status(200).send(result.rows); // Отправляем массив пользователей
  } catch (error) {
    res.status(400).send(error); // Отправляем ошибку в случае сбоя
  }
};

// Update (обновить элемент)
export const updateAdmin = async (req, res) => {
  const { id } = req.params;  // Получаем id из параметра запроса
  const updateFields = req.body;  // Все поля, которые пришли в запросе

  // Фильтруем поля, убирая те, которые не были переданы
  const validFields = Object.entries(updateFields).filter(([key, value]) => value !== undefined);

  // Если нет переданных значений для обновления, возвращаем ошибку
  if (validFields.length === 0) {
    return res.status(400).send({ message: 'No fields to update' });
  }

  // Массив для хранения SQL частей запроса
  const updates = [];
  const values = [];

  // Индекс для параметров, PostgreSQL использует индексы начиная с 1
  let index = 1;

  // Генерируем обновления для каждого переданного поля
  validFields.forEach(([field, value]) => {
    updates.push(`${field} = $${index}`);
    values.push(value);
    index++;
  });

  // Добавляем id в конец значений
  values.push(id);

  // Формируем финальный SQL запрос
  const query = `
    UPDATE history
    SET ${updates.join(', ')}
    WHERE id = $${index}
    RETURNING *`;

  try {
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      res.status(200).send(result.rows[0]);  // Отправляем обновленный объект
    } else {
      res.status(404).send({ message: 'Admin not found' });  // Если объект с таким id не найден
    }
  } catch (error) {
    res.status(400).send(error);  // Ошибка запроса
  }
};

// Delete (удалить элемент)
export const deleteAdmin = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM admins WHERE id = $1 RETURNING *', [req.params.id]);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};