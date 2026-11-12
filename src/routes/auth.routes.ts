import { Router } from 'express';
import { login, registrar } from '../controller/auth.controller';

const router = Router();
router.post('/registro', registrar);
router.post('/login', login);

export default router;
