const Equipment = require('../models/Equipment');

exports.createEquipment = async (req, res) => {
    try {
        const equipment = new Equipment(req.body);
        await equipment.save();
        res.status(201).json(equipment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllEquipments = async (req, res) => {
    try {
        // Atualiza status de todos os equipamentos antes de retornar
        await Equipment.updateMany({}, [
            {
                $set: {
                    status: {
                        $switch: {
                            branches: [
                                { 
                                    case: { $lt: ['$dataFim', new Date()] }, 
                                    then: 'Prazo Expirado' 
                                },
                                { 
                                    case: { 
                                        $lte: [
                                            { $divide: [{ $subtract: ['$dataFim', new Date()] }, 1000 * 60 * 60 * 24] },
                                            15
                                        ]
                                    }, 
                                    then: 'Próximo ao Prazo Final' 
                                }
                            ],
                            default: 'Em Uso - Dentro do Prazo'
                        }
                    }
                }
            }
        ]);

        const equipments = await Equipment.find();
        res.json(equipments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};