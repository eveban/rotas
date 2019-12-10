import { Router } from 'express';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

import MovimentoController from './app/controllers/MovimentoController';
import PedidoController from './app/controllers/PedidoController';
import EstoqueController from './app/controllers/EstoqueController';
import ClienteFornecedorController from './app/controllers/ClienteFornecedorController';
import RotaController from './app/controllers/RotaController';

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
routes.get('/pedidos', PedidoController.index);

routes.post('/rotas', RotaController.store);
routes.get('/rotas', RotaController.index);
routes.get('/rotas/:idRomaneio/:data', RotaController.storeBulk);


export default routes;
