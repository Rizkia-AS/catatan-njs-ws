const express = require('express');
const { body, validationResult } = require(`express-validator`);
const app = express();
const port = 3000;

app.set(`view engine`, `ejs`);
app.use(express.urlencoded({extended : true})); 

const {
    storageCheck,
    loadData,
    findContact,
    upData,
    addcontact,
    cekDuplikat,
    deleteContact
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

// proses data kontak yg dikirim addcontact
app.post(`/hal/contact`, [
    body(`nama`).custom((nm) => {
        const duplikat = cekDuplikat(nm);
        if(duplikat) {throw new Error(`Nama kontak sudah ada`)}
        return true; 
    })
    ] ,(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render(`addcontact.ejs`, {
            judul : `addcontact`,
            errors : errors.array()
        });

    } else {
        addcontact(req.body);
        res.redirect(`/hal/contact`);
    }
    
});


// proses ubah data dari inputan editcontact.ejs
app.post(`/hal/update`, [
    body(`nama`).custom((nm, {req}) => {
        const duplikat = cekDuplikat(nm);
        if(nm !== req.body.oldNama && duplikat) {throw new Error(`Nama kontak sudah ada`)}
        return true; 
    })
    ] ,(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        res.render(`editcontact.ejs`, {
            judul : `editcontact`,
            target : findContact(req.body.oldNama),
            errors : errors.array()
        });

    } else {
        deleteContact(req.body.oldNama);
        addcontact(req.body);  
        res.redirect(`/hal/contact`);
    }
    
});

// proses edit contact
app.get(`/hal/contact/edit/:nama`, (req,res) => {

    const target = findContact(req.params.nama);

    if(!target) {
        res.status(404);
        res.send(`halaman 404`);
    } else {
        res.render(`editcontact.ejs`, {
        judul : `edit kontak`,
        target,
    });
    }

})

// proses delete contact
app.get(`/hal/contact/delete/:nama`, (req,res) => {

    const target = findContact(req.params.nama);

    if(!target) {
        res.status(404);
        res.send(`halaman 404`);
    } else {
        deleteContact(req.params.nama);}
        res.redirect(`/hal/contact`);

})

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
        db : `ini dari db`
    });
})

// sebuah pdf
// app.get('/hal/pedeef', (req, res) => {
//     res.sendFile(`../views/pedeef.pdf`);
// })

app.use(`/`, (req,res) => {
    res.status(404);
    res.send(`halaman 404`);
})






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})