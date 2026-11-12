import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { UsuarioModel } from '../models/usuarios.models';
import { CODIGO_PG, esCodigoPg } from '../middleware/eroror.middleware';

const esTexto = (valor: unknown): valor is string =>
  typeof valor === 'string' && valor.trim() !== '';

export const registrar = async (req: Request, res: Response) => {
  const { nombre, correo, contrasena } = req.body ?? {};

  if (!esTexto(nombre) || !esTexto(correo) || !esTexto(contrasena)) {
    return res.status(400).json({ message: 'Nombre, correo y contraseña son obligatorios' });
  }
  if (contrasena.length < 8) {
    return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres' });
  }

  const contrasenaCifrada = await bcrypt.hash(contrasena, 10);

  try {
    const usuario = await UsuarioModel.crear(nombre.trim(), correo.trim().toLowerCase(), contrasenaCifrada);
    res.status(201).json(usuario);
  } catch (error) {
    if (esCodigoPg(error, CODIGO_PG.DUPLICADO)) {
      return res.status(409).json({ message: 'Ya existe una cuenta con ese correo' });
    }
    throw error;
  }
};

export const login = async (req: Request, res: Response) => {
  const { correo, contrasena } = req.body ?? {};

  if (!esTexto(correo) || !esTexto(contrasena)) {
    return res.status(400).json({ message: 'Correo y contraseña son obligatorios' });
  }

  const encontrado = await UsuarioModel.obtenerPorCorreo(correo.trim().toLowerCase());

  // El mismo mensaje en los dos casos, para no revelar qué correos están registrados.
  if (!encontrado || !(await bcrypt.compare(contrasena, encontrado.contrasena))) {
    return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
  }

  const { contrasena: _contrasena, ...usuario } = encontrado;
  res.json(usuario);
};
