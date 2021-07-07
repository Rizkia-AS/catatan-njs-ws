//      ExpressJs
/*
expressjs.com

framework untuk nodejs yang cepat dan minimalis
adalah sebuah web app 
- web app framework yang dibuat diatas njs
- menyediakan interface yang minimalis yg diperlukan dalam membuat sebuah aplikasi web
- membantu pengelolaan aliaran data dari server ke aplikasi
- MERN, MEAN, MEVN (MongoDB, ExpressJS, React/Angular/Vue, NodeJS)

fitur expressJs
- Menangani request dengan berbagai metode HTTP dengan mudah (routes)
- MVC (Model-VIew-Controller)
- Terintergrasi dengan "view" rendering engine, untuk mengelola template.
- Middleware
*/ 

// cara menggunakan express
// respon adalah segala suatu yg diberikan oleh express ketika kita mentarget halaman tertentu atau url tertentu
// request adalah segala suatu yg dikirimkan ke express


const express = require('express')
const app = express()
const port = 3000

// cara bacanya setelah kita menjalankan appnya dan ada rq method get ke halaman root maka jalankan ini
app.get('/', (req, res) => {
    // mengirimkan data berupa file untuk ditampilkan pada browser
    res.sendFile(`./index.html`, {root : __dirname});
})
app.get('/hal/about', (req, res) => {
    res.sendFile(`./about.html`, { root: __dirname });
})
app.get('/hal/main', (req, res) => {
    res.sendFile(`./index.html`, { root: __dirname });
})

app.get('/hal/pedeef', (req, res) => {
    res.sendFile(`./pedeef.pdf`, { root: __dirname });
})

// app.get('/produk/:id/kategori/:idCat', (req, res) => {
//     res.send(`produk id ${req.params.id} kategori ${req.params.idCat}`);
// })
app.get('/hal/:id', (req, res) => {
    console.log(`produk id ${req.params.id}`);
})


app.use(`/`, (req,res) => {
    // res statur mengirimkan 404 ke dalam status code di browse
    res.status(404);
    // res send mengirimkan data untuk dirender brwoser
    res.send(`halaman 404`);
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})























// const http = require(`http`);
// const { argv } = require("process");
// const fs = require(`fs`);





// const writeHTML = (file,res) => {

//     fs.readFile(`./${file}.html`, (e, data) => {
//         if(e) {
//             res.writeHead(404)
//             res.write(`404`);
//         } else {
//             res.write(data);
//         }

//         res.end();
//     });
// }






// http.createServer((req,res) => {
//     // menulis pada head
//     res.writeHead(200,{
//         "content-Type" : "text/html"
//     });

//     const url = req.url;
//     console.log(url);

//     switch(url) {
//         case `/tes`:
//             // res.write, adalah respon untuk menulis yang akan diberikan server
//             res.write(`helo`);
//             break;

//         case `/index`:
//             writeHTML(`index`,res);
//             break;

//         default:
//             writeHTML(`about`,res);
//             break;
//     }

    
//     // res.end menandakan klo perintah ddidalam server sudah selesai
//     // res.end();

// }).listen(3000, (s) => {
//     console.log(`server is listening on port 3000`);
// })






