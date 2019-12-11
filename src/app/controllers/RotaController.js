import sequelize from 'sequelize';
import Rota from '../models/Rota';

class RotaController {
  /* async store(req, res) {
    const { codcfo } = await Rota.bulkCreate([...req.body]);

    return res.json({
      codcfo,
    });
  } */

  async index(req, res) {
    const rota = await Rota.findAll();
    return res.json(rota);
  }

  async storeBulk(req, res) {
    const { codcfo } = await Rota.bulkCreate([...req.body]);

    return res.json({
      codcfo,
    });
  }

  async store(req, res) {
	  
	var arrayList =  JSON.parse(JSON.stringify(req.body.listRoutes));
	
	console.log('ArrayList: ', arrayList);
	
    const { data, romaneio } = arrayList[0];
	
    const sqlExclui =
      'DELETE FROM ZROTACAR WHERE ROMANEIO = :romaneio AND DATA = :data';

    await Rota.sequelize.query(sqlExclui, {
      replacements: { romaneio, data },
      type: sequelize.QueryTypes.DELETE,
    });

	const list = Object.keys(JSON.stringify(req.body.listRoutes)).map((key) => [key, JSON.stringify(req.body.listRoutes)[key]]);
	
	console.log('>>>>>>>> List: ', list);
	
    await Rota.bulkCreate([list]);
    const { codcfo } = [arrayList];
    return res.json({
      codcfo,
    });

    // Abaixo aqui era assim que fazia no meu backend com postgresql
    /*
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
		*/
  }
}

export default new RotaController();
