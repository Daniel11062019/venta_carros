import type { Cliente } from '../models/clientes.models';
import type { Vehiculo } from '../models/catalogo.models';
import type { Compra } from '../models/compras.models';

// Datos temporales en memoria. Se reemplazarán al conectar una base de datos.
export const clientesDB: Cliente[] = [
  { id: 1, nombre: 'Daniel', apellido: 'Perdomo', cedula: '1001234567', telefono: '3001234567', sexo: 'Masculino' },
  { id: 2, nombre: 'María', apellido: 'Gómez', cedula: '1002345678', telefono: '3012345678', sexo: 'Femenino' },
  { id: 3, nombre: 'Carlos', apellido: 'Rodríguez', cedula: '1003456789', telefono: '3023456789', sexo: 'Masculino' },
  { id: 4, nombre: 'Laura', apellido: 'Martínez', cedula: '1004567890', telefono: '3034567890', sexo: 'Femenino' },
  { id: 5, nombre: 'Andrés', apellido: 'Hernández', cedula: '1005678901', telefono: '3045678901', sexo: 'Masculino' },
  { id: 6, nombre: 'Camila', apellido: 'Torres', cedula: '1006789012', telefono: '3056789012', sexo: 'Femenino' },
  { id: 7, nombre: 'Sebastián', apellido: 'Moreno', cedula: '1007890123', telefono: '3067890123', sexo: 'Masculino' },
  { id: 8, nombre: 'Valentina', apellido: 'Ramírez', cedula: '1008901234', telefono: '3078901234', sexo: 'Femenino' }
];

export const vehiculosDB: Vehiculo[] = [
  { idVehiculo: 1, marca: 'Toyota', modelo: 'Corolla', anio: 2024, cc: 1800, precio: 95000000, categoria: 'Alta' },
  { idVehiculo: 2, marca: 'Mazda', modelo: 'CX-5', anio: 2023, cc: 2500, precio: 135000000, categoria: 'Alta' },
  { idVehiculo: 3, marca: 'Chevrolet', modelo: 'Onix', anio: 2024, cc: 1000, precio: 78000000, categoria: 'Media' },
  { idVehiculo: 4, marca: 'Kia', modelo: 'Sportage', anio: 2023, cc: 2000, precio: 125000000, categoria: 'Alta' },
  { idVehiculo: 5, marca: 'Renault', modelo: 'Duster', anio: 2024, cc: 1600, precio: 92000000, categoria: 'Media' },
  { idVehiculo: 6, marca: 'Nissan', modelo: 'Kicks', anio: 2023, cc: 1600, precio: 99000000, categoria: 'Media' },
  { idVehiculo: 7, marca: 'Ford', modelo: 'Ranger', anio: 2024, cc: 2000, precio: 165000000, categoria: 'Alta' },
  { idVehiculo: 8, marca: 'Volkswagen', modelo: 'T-Cross', anio: 2024, cc: 1400, precio: 110000000, categoria: 'Baja' }
];

export const comprasDB: Compra[] = [
  { idCompra: 1, idCliente: 1, cliente: 'Daniel Perdomo', cedula: '1001234567', idVehiculo: 1, vehiculo: 'Toyota Corolla', fecha: '06/10/2026', precio: 95000000, estado: 'Completada' },
  { idCompra: 2, idCliente: 2, cliente: 'María Gómez', cedula: '1002345678', idVehiculo: 2, vehiculo: 'Mazda CX-5', fecha: '06/10/2026', precio: 135000000, estado: 'Pendiente' },
  { idCompra: 3, idCliente: 3, cliente: 'Carlos Rodríguez', cedula: '1003456789', idVehiculo: 3, vehiculo: 'Chevrolet Onix', fecha: '07/10/2026', precio: 78000000, estado: 'Completada' },
  { idCompra: 4, idCliente: 4, cliente: 'Laura Martínez', cedula: '1004567890', idVehiculo: 4, vehiculo: 'Kia Sportage', fecha: '07/10/2026', precio: 125000000, estado: 'Pendiente' },
  { idCompra: 5, idCliente: 5, cliente: 'Andrés Hernández', cedula: '1005678901', idVehiculo: 5, vehiculo: 'Renault Duster', fecha: '08/10/2026', precio: 92000000, estado: 'Completada' }
];

let siguienteClienteId = clientesDB.length + 1;
export const obtenerSiguienteId = (): number => siguienteClienteId++;

let siguienteVehiculoId = vehiculosDB.length + 1;
export const obtenerSiguienteVehiculoId = (): number => siguienteVehiculoId++;

let siguienteCompraId = comprasDB.length + 1;
export const obtenerSiguienteCompraId = (): number => siguienteCompraId++;
