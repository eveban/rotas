import Sequelize from 'sequelize';

import ClienteFornecedor from '../app/models/ClienteFornecedor';
import ClienteFornecedorCompl from '../app/models/ClienteFornecedorCompl';
import Movimento from '../app/models/Movimento';
import Estoque from '../app/models/Estoque';
import Usuario from '../app/models/Usuario';
import databaseConfig from '../config/database';

const models = [
  Usuario,
  ClienteFornecedor,
  Movimento,
  ClienteFornecedorCompl,
  Estoque,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}
export default new Database();
