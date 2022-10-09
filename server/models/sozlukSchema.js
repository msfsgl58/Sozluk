const mongoose = require('mongoose');
const Schema = mongoose.Schema

const sozluk = new Schema({
    kelime: {
        type: String,
        require: true,
    },
    anlamı: {
        type: String,
        require: true,
    },
},{timestamps:true})

const Sozluk = mongoose.model('SozlukSchema',sozluk)
module.exports = Sozluk