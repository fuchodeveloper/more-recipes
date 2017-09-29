import express from 'express';

const router = express.Router();

router.use('/api/v1/recipes/', require('./recipes'));

module.exports = router;
