const Report = require('../models/reportModel');

// Create a new report
const createReport = async (title, description, userId) => {
  const newReport = new Report({
    title,
    description,
    userId,
    status: 'pending',  // Default status
  });

  await newReport.save();
  return newReport;
};

// Get all reports (can add filtering or pagination if needed)
const getReports = async () => {
  return await Report.find();
};

// Get a specific report by ID
const getReportById = async (id) => {
  const report = await Report.findById(id);
  if (!report) {
    throw new Error('Report not found');
  }
  return report;
};

// Update a report (change its status or other details)
const updateReport = async (id, updateFields) => {
  const report = await Report.findByIdAndUpdate(id, updateFields, { new: true });
  if (!report) {
    throw new Error('Report not found');
  }
  return report;
};

// Delete a report by ID
const deleteReport = async (id) => {
  const report = await Report.findByIdAndDelete(id);
  if (!report) {
    throw new Error('Report not found');
  }
  return report;
};

module.exports = {
  createReport,
  getReports,
  getReportById,
  updateReport,
  deleteReport,
};
