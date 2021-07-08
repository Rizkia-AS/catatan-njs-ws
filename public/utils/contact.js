const fs = require(`fs`);


// cek storage folder dan filenya
const storageCheck = () => {
	if(!fs.existsSync(`./public/data`)) {
		fs.mkdirSync(`./public/data`);
	}

	if(!fs.existsSync(`./public/data/db.json`)) {
			try { 
				fs.appendFileSync(`./public/data/db.json`, `[]`);
				console.log(`file db.js ditambahkan`);
			} catch (err) {
				console.log(err);
			}
	}
}

// ambil data dari db.json
const loadData = () => { 
	storageCheck();
	return JSON.parse(fs.readFileSync(`./public/data/db.json`).toString()); 
}


// cari spesifik kontak
const findContact = (nama) => {
	return loadData().find(dt => dt.nama.toLowerCase() === nama.toLowerCase());
}


module.exports = {
	storageCheck,
	loadData,
	findContact
}