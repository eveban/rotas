import { Router } from 'express';

import ClienteFornecedorController from './app/controllers/ClienteFornecedorController';
import MovimentoController from './app/controllers/MovimentoController';
import EstoqueController from './app/controllers/EstoqueController';

const routes = new Router();

routes.get('/clientes', ClienteFornecedorController.index);
routes.get('/movimentos', MovimentoController.index);

routes.get('/estoque', EstoqueController.index);

export default routes;
