import Rota from '../models/Rota';
import sequelize from 'sequelize';

class RotaController {

	async store(req, res) {
	  const { codcfo } = await Rota.bulkCreate([...req.body]);
  
	  return res.json({
		codcfo,
	  });
	}
	

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
		
		//Aqui não sei como receber os params abaixo é um chute
		let idRomaneio = req.query.idRomaneio;
		let dateSelected = req.query.data;

		console.log('>>>> Romaneio: ', idRomaneio);
		console.log(">>>> Rotas body: ", req.body);

		//antes do bulkInsert teria que deletar, estou achando que precisa ok
		// nao sei sequelize.query se isto existe desta maneira, nao consigo testar
		
		let sqlExclui = "delete from ZROTACAR where romaneio = " + idRomaneio + " and data = " + dateSelected;
		
		sequelize.query(sqlExclui)
			.catch(error => {
				console.log("Rotas erro - Excluir : ", error.message);
				res.status(412).json({ msg: error.message });
			});
			
		//ai sim executa o bulk como vc descobriu, mas não sei se pelo front chega certo os dados ainda	
		const { codcfo } = await Rota.bulkCreate([...req.body]);
  
	    return res.json({
		  codcfo,
	    });
	 
	 //Abaixo aqui era assim que fazia no meu backend com postgresql
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

	};

}

export default new RotaController();
