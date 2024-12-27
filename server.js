require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const equipmentRoutes = require('./routes/equipmentRoutes');

const app = express();

// Middleware
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Rotas
app.use('/api', equipmentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
