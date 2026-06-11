const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getProjects)
  .post(protectAdmin, createProject);

router.post('/verify', (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const { password } = req.body;
  if (password === adminPassword) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false, message: 'Invalid administrator password.' });
});

router.route('/:id')
  .put(protectAdmin, updateProject)
  .delete(protectAdmin, deleteProject);

module.exports = router;
