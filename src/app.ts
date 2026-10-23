import express from 'express';
import cors from 'cors';
 
import clientesRoutes from './routes/cliente.roustes';
import catalogoRoutes from './routes/catalogo.routes';
import comprasRoutes from './routes/compras.routes';
import perritosRoutes from './routes/perritos.routes';
import { errorHandler } from './middleware/eroror.middleware';
 
const app = express();
 
app.use(cors());
 
app.use(express.json());
 
app.get('/api/v1/health', (req, res) => {
 
  res.json({
    status: 'OK'
  });
 
});
 
app.use(
  '/api/v1/clientes',
  clientesRoutes
);

app.use('/api/v1/catalogo', catalogoRoutes);
app.use('/api/v1/compras', comprasRoutes);
app.use('/api/perritos', perritosRoutes);
 
app.use(errorHandler);
 
export default app;
