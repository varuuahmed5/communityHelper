const express = require('express');
const {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
} = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new report (protected)
router.post('/', protect, createReport);

// Get all reports (protected)
router.get('/', protect, getReports);

// Get a single report by ID (protected)
router.get('/:id', protect, getReportById);

// Update a report (protected)
router.put('/:id', protect, updateReport);

// Delete a report (protected)
router.delete('/:id', protect, deleteReport);

module.exports = router;
