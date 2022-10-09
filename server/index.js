const express = require('express');
const mongoose = require('mongoose');
const Sozluk = require('./models/sozlukSchema.js')

mongoose.connect('mongodb+srv://msfsgl58:msf123456@cluster0.qcxgovx.mongodb.net/test').then((res) => {console.log('baglantı kuruldu')}).catch((err) => {console.log(err)})

const server = express();
server.use(express.json());
server.use(express.urlencoded({extended:false}))


//  Local de Çalışmasına Yarar
server.use(function (req, res, next) {

    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    next();

});


server.get('/all',(req,res) => {
    Sozluk.find()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})

server.post('/newPost',(req,res) => {
    console.log(req.body)
    const sozluk = new Sozluk({
        kelime: `${req.body.kelime}`,
        anlamı: `${req.body.anlamı}`,
    })
    sozluk.save()
    .then((result) => {res.send(result)})
    .catch((err) => {console.log(err)}) 
})

server.delete('/deletePost/:id',(req,res) => {
    Sozluk.findByIdAndDelete(req.params.id)
    .then((result) => {res.send(result)})
    .catch((err) =>{console.log(err)})
})

server.put('/putPost/:id',(req,res) => {
    Sozluk.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {res.send(result)})
    .catch((err) => {console.log(err)})
})

server.get('/',(req,res) => {
    res.send('HomePage')
})

server.listen(3000, () => {
    console.log('Server Dinleniyor')
})