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
          field: 'RUA',
        },
        numero: {
          type: Sequelize.STRING,
          field: 'NUMERO',
        },
        bairro: {
          type: Sequelize.STRING,
          field: 'BAIRRO',
        },
        cidade: {
          type: Sequelize.STRING,
          field: 'CIDADE',
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

  static associate(models) {
    this.belongsTo(models.ClienteFornecedorCompl, {
      foreignKey: 'codcfo',
      as: 'entrega',
    });
  }
}
export default ClienteFornecedor;
