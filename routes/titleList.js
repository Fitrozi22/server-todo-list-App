const express = require('express');
const router = express.Router();
const titleListController = require('../controllers/titlelistController');

router.post('/', titleListController.createTitleList);
router.get('/', titleListController.getAllTitleList);
router.get('/:id', titleListController.getTitleListById);
router.put('/:id', titleListController.updateTitleList);
router.delete('/:id', titleListController.deleteTitleList);

module.exports = router