import { Router } from 'express';

import ClienteFornecedorController from './app/controllers/ClienteFornecedorController';
import MovimentoController from './app/controllers/MovimentoController';

const routes = new Router();

routes.get('/clientes', ClienteFornecedorController.index);

routes.get('/movimentos', MovimentoController.index);

export default routes;
