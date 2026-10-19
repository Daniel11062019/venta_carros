import dotenv from 'dotenv';
import { Pool, types } from 'pg';

dotenv.config({ quiet: true });

// pg devuelve BIGINT (precio) como string; se convierte a number para
// que el JSON siga igual que con los datos en memoria.
types.setTypeParser(types.builtins.INT8, (valor) => Number(valor));

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER,  
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Los ids son INTEGER en PostgreSQL; cualquier otro valor se trata como "no encontrado".
export const esIdValido = (id: number): boolean =>
  Number.isInteger(id) && id > 0 && id <= 2147483647;

/**
 * Arma el SET de un UPDATE solo con los campos permitidos que vengan en `datos`.
 * `columnas` mapea la propiedad JSON a la expresión SQL, donde `?` es el parámetro.
 */
export const construirSet = (
  datos: Record<string, unknown> | undefined,
  columnas: Record<string, string>
): { set: string; valores: unknown[] } => {
  const partes: string[] = [];
  const valores: unknown[] = [];

  for (const [propiedad, expresion] of Object.entries(columnas)) {
    if (datos && datos[propiedad] !== undefined) {
      valores.push(datos[propiedad]);
      partes.push(expresion.replace('?', `$${valores.length}`));
    }
  }

  return { set: partes.join(', '), valores };
};
