import Sequelize, { Model } from 'sequelize';
import Tedious from 'tedious';

class Rota extends Model {
  static init(sequelize) {
    super.init(
      {
        codcfo: {
          type: Sequelize.STRING,
          primaryKey: true,
          field: 'CODCFO',
        },
        data: {
          type: Tedious.TYPES.DateTime,
          field: 'DATA',
        },
        ordem: {
          type: Sequelize.INTEGER,
          field: 'ORDEM',
        },
        romaneio: {
          type: Sequelize.STRING,
          field: 'ROMANEIO',
        },
        idmov: {
          type: Sequelize.STRING,
          field: 'IDMOV',
        },
      },
      {
        tableName: 'ZROTACAR',
        freezeTableName: true,
        sequelize,
      }
    );
    return this;
  }
}
export default Rota;
