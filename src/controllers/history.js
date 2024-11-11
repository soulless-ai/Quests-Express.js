import pool from '../db/database.js';

// Create (создать новый элемент)
export const createHistory = async (req, res) => {
  const { team_name, emails, trip, face, scare, comment, come_source, first_time, send, date, admin_id, language, game_name } = req.body;
  try {
    const result = await pool.query(`
      INSERT INTO history 
      (team_name, emails, trip, face, scare, comment, come_source, first_time, send, date, admin_id, language, game_name) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`, 
      [team_name, emails, trip, face, scare, comment, come_source, first_time, send, date, admin_id, language, game_name]);
    res.status(201).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read (получить все элементы)
export const getHistories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM history');
    res.status(200).send(result.rows);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read (получить все элементы по дате)
export const getHistoryByDate = async (req, res) => {
  const { date } = req.query;  // Получаем дату из query параметра (например, 'YYYY-MM-DD')

  if (!date) {
    return res.status(400).send({ message: 'Date is required' });  // Проверяем, что дата передана
  }

  try {
    // Форматируем дату в строку (или используем строку в формате ISO)
    const result = await pool.query(
      'SELECT * FROM history WHERE date::date = $1', // Преобразуем timestamp в дату для сравнения
      [date]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ message: 'No history found for this date' });
    }

    res.status(200).send(result.rows); // Отправляем все записи, которые совпадают по дате
  } catch (error) {
    res.status(400).send(error); // Ошибка запроса
  }
};

// Update (обновить элемент)
export const updateHistory = async (req, res) => {
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
      res.status(404).send({ message: 'History not found' });  // Если объект с таким id не найден
    }
  } catch (error) {
    res.status(400).send(error);  // Ошибка запроса
  }
};

// Delete (удалить элемент)
export const deleteHistory = async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM history WHERE id = $1 RETURNING *', [req.params.id]);
    res.status(200).send(result.rows[0]);
  } catch (error) {
    res.status(400).send(error);
  }
};