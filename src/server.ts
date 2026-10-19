import app from './app';
import { pool } from './config/database';

const puerto = Number(process.env.PORT) || 3000;

const iniciar = async () => {
  try {
    await pool.query('SELECT 1');
    console.log(`Conectado a PostgreSQL (${process.env.DB_NAME} en ${process.env.DB_HOST}:${process.env.DB_PORT})`);
  } catch (error) {
    console.error('No se pudo conectar a PostgreSQL. Revisa los datos DB_* del archivo .env.', error);
    process.exit(1);
  }

  app.listen(puerto, () => {
    console.log(`Servidor iniciado en http://localhost:${puerto}`);
  });
};

iniciar();
