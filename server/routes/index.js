const Router = require('express');
const router = new Router();
const deviceRoutes = require('./deviceRoutes');
const userRoutes = require('./userRoutes');
const typeRoutes = require('./typeRoutes');
const brandRoutes = require('./brandRoutes');

router.use('/user', userRoutes);
router.use('/type', typeRoutes);
router.use('/brand', brandRoutes);
router.use('/device', deviceRoutes);

module.exports = router;