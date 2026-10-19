import {
  Request,
  Response,
  NextFunction
} from 'express';

// Códigos de error de PostgreSQL que se traducen a respuestas 4xx.
export const CODIGO_PG = {
  DUPLICADO: '23505',
  LLAVE_FORANEA: '23503',
  CAMPO_OBLIGATORIO: '23502',
  TIPO_INVALIDO: '22P02',
  FECHA_INVALIDA: '22007',
  FECHA_FUERA_DE_RANGO: '22008',
  NUMERO_FUERA_DE_RANGO: '22003',
  TEXTO_DEMASIADO_LARGO: '22001'
} as const;

export const esCodigoPg = (error: unknown, codigo: string): boolean =>
  typeof error === 'object' && error !== null && (error as { code?: unknown }).code === codigo;

const ERRORES_DE_DATOS: string[] = [
  CODIGO_PG.CAMPO_OBLIGATORIO,
  CODIGO_PG.TIPO_INVALIDO,
  CODIGO_PG.FECHA_INVALIDA,
  CODIGO_PG.FECHA_FUERA_DE_RANGO,
  CODIGO_PG.NUMERO_FUERA_DE_RANGO,
  CODIGO_PG.TEXTO_DEMASIADO_LARGO
];

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (esCodigoPg(error, CODIGO_PG.DUPLICADO)) {
    return res.status(409).json({
      message: 'Ya existe un registro con esa cédula'
    });
  }

  if (esCodigoPg(error, CODIGO_PG.LLAVE_FORANEA)) {
    return res.status(400).json({
      message: 'El cliente o el vehículo indicado no existe'
    });
  }

  if (ERRORES_DE_DATOS.some((codigo) => esCodigoPg(error, codigo))) {
    return res.status(400).json({
      message: 'Datos inválidos o incompletos'
    });
  }

  console.error(error);

  res.status(500).json({
    message: 'Error interno del servidor'
  });

};
