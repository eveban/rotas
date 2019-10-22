import * as Yup from 'yup';
import Usuario from '../models/Usuario';

class UsuarioController {
  async store(req, res) {
    const schema = Yup.object().shape({
      nome: Yup.string().required(),
      username: Yup.string().required('Username obrigatório'),
      email: Yup.string('E-mail obrigatório')
        .email()
        .required(),
      senha: Yup.string()
        .required('Senha obrigatória')
        .min(6, 'Minimo 6 caracteres'),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha da validação dos dados' });
    }

    const maxId = await Usuario.max('id');
    const novoId = maxId + 1;

    const usuarioExiste = await Usuario.findOne({
      where: { username: req.body.username },
    });

    if (usuarioExiste) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const { nome } = await Usuario.create({
      ...req.body,
      id: novoId,
    });

    return res.json({
      nome,
    });
  }

  async update(req, res) {
    const { username, oldSenha } = req.body;
    const usuario = await Usuario.findByPk(req.id);
    if (username !== usuario.username) {
      const existeUsuario = await Usuario.findOne({ where: { username } });
      if (existeUsuario) {
        return res.status(400).json({ error: 'Usuário ja existe' });
      }
    }
    if (oldSenha && !(await usuario.verificaSenha(oldSenha))) {
      return res.status(401).json({ error: 'Senha não bate' });
    }
    await usuario.update(req.body);

    const { id, nome, email } = await Usuario.findByPk(req.id);

    return res.json({ id, nome, username, email });
  }

  async index(req, res) {
    const usuario = await Usuario.findAll();
    return res.json(usuario);
  }
}
export default new UsuarioController();
