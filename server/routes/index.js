import express from 'express';

const router = express.Router();

router.use('/api/v1/', require('./recipes'));

module.exports = router;
