const { Router } = require('express');
const auth = require('../../interface-adapters/middleware/auth.js');

const router = Router();

router.get('/secret', auth, (req,res) => {
	res.status(200).send('secret data');
});

module.exports = router;