const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

router.post('/equipments', equipmentController.createEquipment);
router.get('/equipments', equipmentController.getAllEquipments);

module.exports = router;
