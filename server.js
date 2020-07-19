var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const service = require('./service');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Olá, bem vindo ao Doador Web Service!');
});

app.post('/persons', async function (req, res) {
	const person = await service.savePerson(req.body);
	res.json(person);
});

app.put('/persons/:idPerson', async function (req, res) {
	const idPerson = req.params.idPerson;
	const person = await service.updatePerson(idPerson, req.body);
	res.json(person);
});

app.post('/donations', async function (req, res) {
	const donation = await service.saveDonation(req.body);
	res.json(donation);
});

app.delete('/donations/:idDonation', async function (req, res) {
	await service.deleteDonation(req.params.idDonation);
	res.end();
});

app.get('/statistics', async function (req,res) {
	const filters = req.query;
	const statistics = await service.getStatistics(filters);
	res.json(statistics);
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});