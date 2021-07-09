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



// menuliskan / menimpa file db.json dengan data yang baru / upload
const upData = (kontak) => {
	fs.writeFileSync(`./public/data/db.json`, JSON.stringify(kontak));
}

// menambahkan array data kontak baru untuk nantinya diupload
const addcontact = (data) => {
	const kontak = loadData();
	kontak.push(data);
	return upData(kontak);
}

// cek nama yang sama
const cekDuplikat = (nm) => {
	let duplikat = null;
	loadData().map(kontak => {
		if(kontak.nama == nm) {duplikat = true}
	});
	return duplikat;
}

module.exports = {
	storageCheck,
	loadData,
	findContact,
	upData,
	addcontact,
	cekDuplikat
}