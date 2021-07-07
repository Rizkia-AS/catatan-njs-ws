const http = require(`http`);
const { argv } = require("process");
const fs = require(`fs`);





const writeHTML = (file,res) => {

    fs.readFile(`./${file}.html`, (e, data) => {
        if(e) {
            res.writeHead(404)
            res.write(`404`);
        } else {
            res.write(data);
        }

        res.end();
    });
}






http.createServer((req,res) => {
    // menulis pada head
    res.writeHead(200,{
        "content-Type" : "text/html"
    });

    const url = req.url;
    console.log(url);

    switch(url) {
        case `/tes`:
            // res.write, adalah respon untuk menulis yang akan diberikan server
            res.write(`helo`);
            break;

        case `/index`:
            writeHTML(`index`,res);
            break;

        default:
            writeHTML(`about`,res);
            break;
    }

    
    // res.end menandakan klo perintah ddidalam server sudah selesai
    // res.end();

}).listen(3000, (s) => {
    console.log(`server is listening on port 3000`);
})






