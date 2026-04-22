const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');
const { validateAuthorInput } = require('../middleware/validators');

router.get('/', authorsController.getAll);
router.get('/:id', authorsController.getById);
router.post('/', validateAuthorInput, authorsController.create);
router.put('/:id', validateAuthorInput, authorsController.update);
router.delete('/:id', authorsController.delete);

module.exports = router;
