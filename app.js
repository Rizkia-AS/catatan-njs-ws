

const express = require('express')
const morgan = require(`morgan`);


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




// BUILTIN MIDDLEWARE
// secara default express melindungi aset atau file statis yang kita miliki untuk membuat sebuah web, dengan tidak mengizinkan orang lain untuk merequest file tersebut.

// namun jika kita ingin memberikan akses orang lain ke file atau aset tsb kita gunakan function express.static

// kode dibawah mengizinkan folder `public` untuk diakses orang lain dengan relatif url
app.use(express.static(`public`));




// THRID PARTY MIDDLEWARE
// disebut tp middleware karna midware ini dibuat pihak diluar dari express
// morgan adalah tp middleware untuk menampilkan pesan sesuatu kedalam console di command line. atau bisa dibilang fungsi logger
app.use(morgan(`dev`));




// APPLICTION LEVEL MIDDLEWARE
// ketika app.use tidak diberi path, maka app.use itu akan berjalan didalam kondisi request apapun
app.use((req,res,next) => {
    console.log(`dini`);

    // fungsi next() agar setelah aplikasi ini middleware dijalankan express akan bergerak ke aplikasi berikutnya atau middleware berikutnya, berbeda pada routing yg tidak perlu ditambahkan next() agar setelah selesai otomatis berhenti
    next();
});

app.use((req,res,next) => {
    console.log(`ini middleware kedua`);
    next();
});








// app.get adalah sebuah contoh routing, routing sendiri adalah sebuah program yang berjalan setelah user melakukan request dan sebelum halamannya tampil ke layar, jadi routing juga dapat disebut middleware
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


// app.get('/hal/:id', (req, res) => {
//     console.log(`produk id ${req.params.id}`);
// })


// ini adalah contoh middleware
app.use(`/`, (req,res) => {
    res.status(404);
    res.send(`halaman 404`);
})






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
