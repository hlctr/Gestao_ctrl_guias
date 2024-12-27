require('dotenv').config();
const mongoose = require('mongoose');
const Equipment = require('./models/Equipment');

const seedEquipments = [
    {
        tipo: 'Projetor',
        marca: 'Epson',
        modelo: 'S23',
        numeroSerie: 'PATMA24',
        patrimonio: '999',
        solicitante: 'Marcelo Vagner',
        responsavel: 'Paulo Victor',
        telefoneResponsavel: '(75) 99999-9999',
        localDestino: 'Escola do Centro de Assistencia Social Santo Antonio - Ecassa',
        enderecoDestino: 'Frei aureliano de Grottanare n°823 - Capuchinhos, Feira de Santana - BA, 44077-760',
        motivoUso: 'Técnico em Informática básica',
        dataInicio: new Date('2024-12-10'),
        dataFim: new Date('2025-03-10'),
        observacao: 'Sem observação',
        dataDisponibilidade: new Date('2024-12-10'),
        tecnicoResponsavel: 'Herlon Alcântara',
        status: 'Em Uso - Dentro do Prazo'
    }
    // Adicione mais equipamentos de exemplo
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        // Limpa a coleção existente
        await Equipment.deleteMany({});

        // Insere dados de seed
        await Equipment.insertMany(seedEquipments);

        console.log('🌱 Dados iniciais inseridos com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao inserir dados iniciais:', error);
    } finally {
        mongoose.connection.close();
    }
}

seedDatabase();