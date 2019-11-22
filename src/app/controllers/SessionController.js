import jwt from 'jsonwebtoken';
import { TableHints } from 'sequelize';
import Usuario from '../models/Usuario';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { username, password } = req.body;
    const usuario = await Usuario.findOne({
      tableHint: TableHints.NOLOCK,
      where: { username },
    });

    if (!usuario) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }
    if (!(await usuario.verificaSenha(password))) {
      return res.status(400).json({ error: 'Senha inválida' });
    }
    const { id, nome, email } = usuario;
    return res.json({
      usuario: {
        id,
        nome,
        username,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
