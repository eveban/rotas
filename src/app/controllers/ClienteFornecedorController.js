import { Op } from 'sequelize';
import ClienteFornecedor from '../models/ClienteFornecedor';

class ClienteFornecedorController {
  async index(req, res) {
    const clientes = await ClienteFornecedor.findAll({
      where: {
        codcfo: {
          [Op.like]: `${req.query.codigo}%`,
        },
        rua: {
          [Op.ne]: null,
        },
        ativo: 1,
      },
      attributes: ['codcfo', 'rua', 'numero', 'bairro', 'cidade'],
    });
    return res.json(clientes);
  }
}

export default new ClienteFornecedorController();
