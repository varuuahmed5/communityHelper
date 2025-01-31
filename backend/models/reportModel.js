// reportController.js - Controller for CRUD operations
const Report = require('../models/reportModel'); // Import the Report model

// Create new report
const createReport = async (req, res) => {
  try {
    const newReport = new Report({
      title: req.body.title,
      description: req.body.description,
      createdAt: new Date(),
    });
    const savedReport = await newReport.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Error creating report' });
  }
};

// Get all reports
const getReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports' });
  }
};

// Update a report by ID
const updateReport = async (req, res) => {
  try {
    const updatedReport = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedReport);
  } catch (error) {
    res.status(500).json({ message: 'Error updating report' });
  }
};

// Delete a report by ID
const deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Report deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting report' });
  }
};

module.exports = {
  createReport,
  getReports,
  updateReport,
  deleteReport,
};
