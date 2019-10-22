import { Router } from 'express';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

import MovimentoController from './app/controllers/MovimentoController';
import EstoqueController from './app/controllers/EstoqueController';
import ClienteFornecedorController from './app/controllers/ClienteFornecedorController';

const routes = new Router();
routes.get('/usuarios', UsuarioController.index);
routes.post('/usuarios', UsuarioController.store);
routes.post('/session', SessionController.store);

routes.get('/', (req, res) => res.send('ok'));
routes.use(authMiddleware);

routes.put('/usuarios', UsuarioController.update);

routes.get('/estoque', EstoqueController.index);
routes.get('/clientes', ClienteFornecedorController.index);
routes.get('/movimentos', MovimentoController.index);

export default routes;
