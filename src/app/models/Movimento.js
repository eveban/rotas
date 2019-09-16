import Sequelize, { Model } from 'sequelize';
import Tedious from 'tedious';

class Movimento extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          field: 'IDMOV',
        },
        codTipoMovimento: {
          type: Sequelize.STRING(10),
          field: 'CODTMV',
        },
        romaneio: {
          type: Sequelize.STRING(10),
          field: 'CODTB5FAT',
        },
        dataEmissao: {
          type: Tedious.TYPES.DateTime,
          field: 'DATAEMISSAO',
        },
        status: {
          type: Sequelize.CHAR,
        },
      },
      {
        tableName: 'TMOV',
        freezeTableName: true,
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.ClienteFornecedor, {
      foreignKey: 'codcfo',
      as: 'clienteFornecedor',
    });
  }
}

export default Movimento;
