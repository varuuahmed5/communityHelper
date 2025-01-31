const reportService = require('../services/reportService');

// Create a new report
const createReport = async (req, res) => {
  const { title, description } = req.body;
  try {
    const report = await reportService.createReport(title, description, req.user._id);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await reportService.getReports();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a report by ID
const getReportById = async (req, res) => {
  const { id } = req.params;
  try {
    const report = await reportService.getReportById(id);
    res.status(200).json(report);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a report
const updateReport = async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;
  try {
    const updatedReport = await reportService.updateReport(id, updateFields);
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  const { id } = req.params;
  try {
    await reportService.deleteReport(id);
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
};
