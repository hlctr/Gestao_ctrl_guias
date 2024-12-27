const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('📦 Conexão com o MongoDB estabelecida com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao conectar com o MongoDB:', error);
        // Encerra o processo se não conseguir conectar
        process.exit(1);
    }
};

module.exports = connectDB;

