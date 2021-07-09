const express = require('express');
const { body, validationResult } = require(`express-validator`);
const app = express();
const port = 3000;

app.set(`view engine`, `ejs`);
// express.urlencoded digunakan untuk memparse data yg dikirimkan oleh user melalui form
app.use(express.urlencoded({extended : true})); 

const {
    storageCheck,
    loadData,
    findContact,
    upData,
    addcontact,
    cekDuplikat
} = require(`./public/utils/contact.js`);





app.use(express.static(`public`));
app.use((req,res,next) => {
    storageCheck();
    next()
})

app.get('/', (req, res) => {
    res.sendFile(`./index.html`, {root : __dirname});
})


// halaman daftar kontak
app.get('/hal/contact', (req, res) => {

    res.render(`contact`, {
        judul : `about`,
        db : loadData(),
    });
})

// halaman tambah kontak
app.get('/hal/contact/add', (req, res) => {

    res.render(`addcontact.ejs`, {
        judul : `addcontact`,
    });
})

// proses data kontak
// app.post fungsi digunakan ketika user mengirimkan sesuatu melalui form
app.post(`/hal/contact`, [
    body(`nama`).custom((nm) => {
        const duplikat = cekDuplikat(nm);
        if(duplikat) {throw new Error(`Nama kontak sudah ada`)}
        return true; 
    })
    ] ,(req,res) => {
    // req.body berisi data yg dikirimkan user berbentuk objek dengan properti sesuai dengan nama pada atribut name di input form
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render(`addcontact.ejs`, {
            judul : `addcontact`,
            errors : errors.array()
        });

    } else {
        addcontact(req.body);
        // res.redirect digunakan untuk setelah post dilakukan langsung pergi menuju ke hal contact
        res.redirect(`/hal/contact`);
    }
    
});


// halaman detail kontak
app.get('/hal/contact/:nama', (req, res) => {

    res.render(`detail.ejs`, {
        judul : `detail`,
        db : findContact(req.params.nama),
        ns : req.params.nama
    });
})

// halaman utaman/main
app.get('/hal/main', (req, res) => {
    res.render(`index`,{ 
        judul : `index`, 
        db : `ini dari db`, 
        siswa});
})

// sebuah pdf
app.get('/hal/pedeef', (req, res) => {
    res.sendFile(`pedeef.pdf`);
})

app.use(`/`, (req,res) => {
    res.status(404);
    res.send(`halaman 404`);
})






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})