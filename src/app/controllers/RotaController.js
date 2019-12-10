import Rota from '../models/Rota';
import sequelize from 'sequelize';

class RotaController {

	/*async store(req, res) {
	  const { codcfo } = await Rota.create({
		...req.body,
	  });
  
	  return res.json({
		codcfo,
	  });
	}
	*/

	async index(req, res) {
		const rota = await Rota.findAll();
		return res.json(rota);
	}

	async store(req, res) {
		let idRomaneio = req.query.idRomaneio;

		console.log('>>>> Romaneio: ', idRomaneio);
		console.log(">>>> Rotas body: ", req.body);

		let rotasArray = req.body;
		let sqlInsert = "";

		for (var i = 0; i < rotasArray.length; i++) {
			let codcfo = rotasArray[i].codcfo;
			let data = rotasArray[i].data;
			let ordem = rotasArray[i].ordem;
			let romaneio = rotasArray[i].romaneio;
			sqlInsert += "(" + codcfo + "," + data + "," + ordem + "," + romaneio + "),";
		}

		let sqlExclui = "delete from ZROTACAR where romaneio = " + idRomaneio;
		console.log("Sql Delete", sqlExclui);
		sequelize.query(sqlExclui)
			.catch(error => {
				console.log("Rotas erro - Excluir : ", error.message);
				res.status(412).json({ msg: error.message });
			});

		if (sqlInsert.length > 0) {
			sqlInsert = sqlInsert.substring(1, (sqlInsert.length - 1));
			sqlInsert = "Insert into ZROTACAR(CODCFO, DATA, ORDEM, ROMANEIO) values(" + sqlInsert + ";";
			console.log("Sql Insert", sqlInsert);
			sequelize.query(sqlInsert)
				//.then(result => res.json(result))
				.catch(error => {
					console.log("ZROTACAR erro - Insert : ", error.message);
					res.status(412).json({ msg: error.message });
				});
		}

	};

}

export default new RotaController();
