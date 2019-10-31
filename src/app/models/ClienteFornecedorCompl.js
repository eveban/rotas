import Sequelize, { Model } from 'sequelize';

class ClienteFornecedorCompl extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'CODCFO',
        },
        latitude: {
          type: Sequelize.STRING(30),
          field: 'latitude',
        },
        longitude: {
          type: Sequelize.STRING(30),
          field: 'longitude',
        },
        prioridade: {
          type: Sequelize.INTEGER,
        },
      },
      {
        tableName: 'FCFOCOMPL',
        freezeTableName: true,
        sequelize,
      }
    );
    return this;
  }
}

export default ClienteFornecedorCompl;
