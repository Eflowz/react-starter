const express = require('express');
const router = express.Router();

const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD; 

router.post('/admin/login', (req, res) => {
const { username, password } = req.body;

if (username === adminUsername && password === adminPassword) {
  return res.json({ isAuthenticated: true, role: 'admin' });
}

return res.status(401).json({ isAuthenticated: false, message: 'Invalid credentials' });

});

module.exports = router;
