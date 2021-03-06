import { Op } from 'sequelize';
import ClienteFornecedor from '../models/ClienteFornecedor';
import ClienteFornecedorCompl from '../models/ClienteFornecedorCompl';
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
      attributes: ['idmov', 'romaneio', 'dataEmissao'],
      include: [
        {
          model: ClienteFornecedor,
          as: 'cliente',
          attributes: ['codcfo', 'rua', 'numero', 'bairro', 'cidade'],
        },
        {
          model: ClienteFornecedorCompl,
          as: 'entrega',
          attributes: ['prioridade', 'latitude', 'longitude'],
        },
      ],
    });
    return res.json(movimentos);
  }
}

export default new MovimentoController();
