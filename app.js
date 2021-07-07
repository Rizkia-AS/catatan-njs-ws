

const express = require('express')
const app = express()
const port = 3000


// perintah agar express menggunakan ejs
app.set(`view engine`, `ejs`);

// saat kita memakai ejs atau view engine yang lain, expressnya sdh mendeteksi ada atau tidaknya view didalam volder halaman views

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




app.get('/', (req, res) => {
    res.sendFile(`./index.html`, {root : __dirname});
})

app.get('/hal/about', (req, res) => {
    // res.sendFile(`./about.html`, { root: __dirname });
    // jka menggunakan view maka seperti ini :
    // otomatis mendeteksi file root view yaitu views
    // file yg td berextensi html harus diganti menjadi ejs
    res.render(`about`, {judul : `about`,  db : `ini dari db`,});
})

app.get('/hal/main', (req, res) => {
    // argumen ke dua berisi objek yang akan di kirim ke index.html
    res.render(`index`,{ 
        judul : `index`, 
        db : `ini dari db`, 
        siswa});
})

app.get('/hal/pedeef', (req, res) => {
    res.render(`pedeef`);
})

app.get('/hal/:id', (req, res) => {
    console.log(`produk id ${req.params.id}`);
})


app.use(`/`, (req,res) => {
    res.status(404);
    res.send(`halaman 404`);
})






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
