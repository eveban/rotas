import { Op } from 'sequelize';
import ClienteFornecedor from '../models/ClienteFornecedor';
import Movimento from '../models/Movimento';

class MovimentoController {
  async index(req, res) {
    const { romaneio, dataEmissao } = req.query;
    const movimentos = await Movimento.findAll({
      where: {
        romaneio,
        dataEmissao,
        codTipoMovimento: '2.1.10',
        status: {
          [Op.ne]: 'c',
        },
      },
      attributes: ['romaneio', 'dataEmissao'],
      include: [
        {
          model: ClienteFornecedor,
          as: 'clienteFornecedor',
          attributes: ['codcfo', 'rua', 'numero', 'bairro', 'cidade'],
        },
      ],
    });
    return res.json(movimentos);
  }
}

export default new MovimentoController();
