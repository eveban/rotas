import sequelize from 'sequelize';
import Estoque from '../models/Estoque';

class EstoqueController {
  async index(req, res) {
    const producao = await Estoque.findAll({
      where: {
        data: '2019-09-20',
      },
      attributes: [
        'produto',
        [sequelize.fn('count', sequelize.col('LOTE')), 'caixas'],
        [sequelize.fn('sum', sequelize.col('PECAS')), 'pecas'],
      ],
      group: 'LOTE',
    });
    return res.json(producao);
  }
}

export default new EstoqueController();
