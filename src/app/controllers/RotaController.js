import Rota from '../models/Rota';

class RotaController {
  async store(req, res) {
    console.log(`Passei aqui ${req.param.codcfo}`);
    const { codcfo } = await Rota.create({
      ...req.body,
    });

    return res.json({
      codcfo,
    });
  }

  async index(req, res) {
    const rota = await Rota.findAll();
    return res.json(rota);
  }
}
export default new RotaController();
