
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const mongoDb = process.env.MONGO_DB;

const connect = async () => {
    try {
        const db = await mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
        const { name, host } = db.connection;
        console.log(`Conectado a la Database de la Premier League : ${name} en el host❤️: ${host}`);
    } catch (error) {
        console.error(`No se ha podido conectar a la Database 💔`, error)
    }
}

module.exports = { connect };