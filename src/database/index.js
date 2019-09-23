import Sequelize from 'sequelize';

import ClienteFornecedor from '../app/models/ClienteFornecedor';
import Movimento from '../app/models/Movimento';
import Estoque from '../app/models/Estoque';
import databaseConfig from '../config/database';

const models = [ClienteFornecedor, Movimento, Estoque];

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
