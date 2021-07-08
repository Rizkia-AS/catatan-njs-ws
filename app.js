const express = require('express');
const app = express();
const port = 3000;

app.set(`view engine`, `ejs`);


const {
    storageCheck,
    loadData,
    findContact
} = require(`./public/utils/contact.js`);





const siswa = [
    {
        nama : `rizkia`,
        kelas : 10
    },
    {
        nama : `dini`,
        kelas : 12
    },
]



app.use(express.static(`public`));
app.use((req,res,next) => {
    storageCheck();
    next()
})

app.get('/', (req, res) => {
    res.sendFile(`./index.html`, {root : __dirname});
})


app.get('/hal/contact', (req, res) => {

    res.render(`contact`, {
        judul : `about`,
        db : loadData(),
    });
})

app.get('/hal/contact/:nama', (req, res) => {

    res.render(`detail.ejs`, {
        judul : `detail`,
        db : findContact(req.params.nama),
        ns : req.params.nama
    });
})



app.get('/hal/main', (req, res) => {
    res.render(`index`,{ 
        judul : `index`, 
        db : `ini dari db`, 
        siswa});
})


app.get('/hal/pedeef', (req, res) => {
    res.render(`pedeef`);
})

app.use(`/`, (req,res) => {
    res.status(404);
    res.send(`halaman 404`);
})






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})