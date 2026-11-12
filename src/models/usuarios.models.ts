import { pool } from '../config/database';

export interface Usuario {
  idUsuario: number;
  nombre: string;
  correo: string;
  rol: string;
}

export class UsuarioModel {
  static async obtenerPorCorreo(correo: string): Promise<(Usuario & { contrasena: string }) | null> {
    const { rows } = await pool.query<Usuario & { contrasena: string }>(
      `SELECT u.id_usuario AS "idUsuario", u.nombre, u.correo, u.contrasena, r.nombre AS rol
       FROM usuarios u
       JOIN roles r ON r.id_rol = u.id_rol
       WHERE u.correo = $1`,
      [correo]
    );
    return rows[0] ?? null;
  }

  // Todo usuario nuevo queda como 'cliente'; el rol nunca viene del formulario.
  static async crear(nombre: string, correo: string, contrasena: string): Promise<Usuario> {
    const { rows } = await pool.query<Usuario>(
      `INSERT INTO usuarios (nombre, correo, contrasena, id_rol)
       SELECT $1, $2, $3, id_rol FROM roles WHERE nombre = 'cliente'
       RETURNING id_usuario AS "idUsuario", nombre, correo, 'cliente' AS rol`,
      [nombre, correo, contrasena]
    );
    return rows[0];
  }
}
