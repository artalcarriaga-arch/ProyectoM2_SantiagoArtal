const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const { validatePostInput, validatePostUpdateInput } = require('../middleware/validators');

router.get('/', postsController.getAll);
router.get('/author/:authorId', postsController.getByAuthorId);
router.get('/:id', postsController.getById);
router.post('/', validatePostInput, postsController.create);
router.put('/:id', validatePostUpdateInput, postsController.update);
router.delete('/:id', postsController.delete);

module.exports = router;
