import Sequelize, { Model } from 'sequelize';
import Tedious from 'tedious';

class Estoque extends Model {
  static init(sequelize) {
    super.init(
      {
        codcfo: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        produto: {
          type: Sequelize.STRING,
          field: 'LOTE',
        },
        peso: {
          type: Sequelize.DECIMAL(10, 2),
          field: 'PESO1',
        },
        quantidade: {
          type: Sequelize.INTEGER,
          field: 'PECAS',
        },
        data: {
          type: Tedious.TYPES.DateTime2,
          field: 'DATAPRODUCAO',
        },
      },
      {
        tableName: 'ZTINTEGRACAO',
        freezeTableName: true,
        sequelize,
      }
    );
    return this;
  }
}
export default Estoque;
