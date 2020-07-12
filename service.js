const database = require('./database');

const savePerson = async function (person) { 
	return await database.query(`insert into donator.person 
	(name, phone, street, neighborhood, city, state, cep) 
	values ($1, $2, $3, $4, $5, $6, $7) returning *`,
	[person.name, person.phone, person.street, person.neighborhood, 
	person.city, person.state, person.cep]);
};

const saveDonation = async function (donation) {
	const savedDonation = await database.one(`
		insert into donator.donation (id_person, date, address) 
		values ($1, $2, $3) returning *`, 
		[donation.idPerson, new Date(donation.date), donation.address]);
	for (let product of donation.products) {
		await saveProduct(product, savedDonation.idDonation);
	}
};

const getStatistics = async function (filters) {
	let query = `
		select 
			count(*) as donations 
		from 
			donator.donation d
		where 1 = 1 `;
	if (filters.neighborhood) {
		query += ` and d.address->>'neighborhood' like '%${filters.neighborhood}%'`
	}
	let statistics =  await database.oneOrNone(query);
	let productQuery = `
		select 
			count(*) as products
		from 
			donator.product p
		join donator.donation d using (id_donation)
		where 1 = 1 `;
	if (filters.neighborhood) {
		productQuery += ` and d.address->>'neighborhood' like '%${filters.neighborhood}%'`;
	}
	if (filters.productCategory) {
		productQuery += ` and p.category like '%${filters.productCategory}%'`;	
	}
	statistics = Object.assign(statistics, await database.oneOrNone(productQuery));
	return statistics;
	
}

const saveProduct = async function (product, idDonation) {
	await database.none(`insert into donator.product (category, description, id_donation, size) values ($1, $2, $3, $4)`, [product.category, product.description, idDonation, product.size]);
};

module.exports = {
	savePerson,
	saveDonation,
	getStatistics
};