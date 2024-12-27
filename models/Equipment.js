const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    tipo: { type: String, required: true },
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    numeroSerie: { type: String, unique: true },
    patrimonio: { type: String },
    solicitante: { type: String, required: true },
    responsavel: { type: String, required: true },
    telefoneResponsavel: { type: String },
    localDestino: { type: String },
    enderecoDestino: { type: String },
    motivoUso: { type: String },
    dataInicio: { type: Date, required: true },
    dataFim: { type: Date, required: true },
    observacao: { type: String },
    dataDisponibilidade: { type: Date },
    tecnicoResponsavel: { type: String },
    status: {
        type: String, 
        enum: [
            'Solicitado', 
            'Em Uso - Dentro do Prazo', 
            'Próximo ao Prazo Final', 
            'Prazo Expirado', 
            'Aguardando Coleta'
        ],
        default: 'Solicitado'
    }
}, { timestamps: true });

// Método para verificar e atualizar status
EquipmentSchema.methods.updateStatus = function() {
    const hoje = new Date();
    const dataFim = this.dataFim;
    const diasParaFim = (dataFim - hoje) / (1000 * 60 * 60 * 24);

    if (hoje > dataFim) {
        this.status = 'Prazo Expirado';
    } else if (diasParaFim <= 15) {
        this.status = 'Próximo ao Prazo Final';
    } else {
        this.status = 'Em Uso - Dentro do Prazo';
    }
    return this.save();
};

module.exports = mongoose.model('Equipment', EquipmentSchema);
