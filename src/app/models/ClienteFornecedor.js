import Sequelize, { Model } from 'sequelize';

class ClienteFornecedor extends Model {
  static init(sequelize) {
    super.init(
      {
        codcfo: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        rua: {
          type: Sequelize.STRING,
          field: 'RUAENTREGA',
        },
        numero: {
          type: Sequelize.STRING,
          field: 'NUMEROENTREGA',
        },
        bairro: {
          type: Sequelize.STRING,
          field: 'BAIRROENTREGA',
        },
        cidade: {
          type: Sequelize.STRING,
          field: 'CIDADEENTREGA',
        },
        ativo: {
          type: Sequelize.SMALLINT,
          field: 'ATIVO',
        },
      },
      {
        tableName: 'FCFO',
        freezeTableName: true,
        sequelize,
      }
    );
    return this;
  }
}
export default ClienteFornecedor;
