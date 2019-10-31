import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          field: 'idcrmusuario',
          primaryKey: true,
          autoIncrementIdentity: true,
        },
        nome: {
          type: Sequelize.STRING,
        },
        username: {
          type: Sequelize.STRING,
        },
        senha: {
          type: Sequelize.VIRTUAL,
        },
        password_hash: {
          type: Sequelize.STRING,
          field: 'password_hash',
        },
        email: {
          type: Sequelize.STRING,
        },
        masteruser: {
          type: Sequelize.CHAR,
        },
      },
      {
        tableName: 'CRMUSUARIO',
        freezeTableName: true,
        sequelize,
      }
    );

    this.addHook('beforeSave', async usuario => {
      if (usuario.senha) {
        usuario.password_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });

    return this;
  }

  verificaSenha(senha) {
    return bcrypt.compare(senha, this.password_hash);
  }
}
export default Usuario;
