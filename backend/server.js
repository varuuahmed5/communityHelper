const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const errorHandler = require('./middleware/errorMiddleware');
const dbConfig = require('./config/db');
const fs = require('fs');
const archiver = require('archiver');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const generatePDF = (req, res) => {
  const doc = new PDFDocument();

  const submitReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Example Report',
          description: 'Test report',
          userId: '123456',
        }),
      });
  
      const data = await response.json();
      console.log('Report submitted:', data);
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };
  
  submitReport();
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');

  doc.pipe(res);

  doc.fontSize(12).text('Event Report', { align: 'center' });
  doc.text('Generated on: ' + new Date().toLocaleString());

  // Add dynamic content here
  req.body.reports.forEach((report) => {
    doc.addPage();
    doc.text(`Title: ${report.title}`);
    doc.text(`Description: ${report.description}`);
    doc.text(`Date: ${report.createdAt}`);
  });

  doc.end();
};

app.post('/api/reports/pdf', generatePDF);


// Function to create zip file
const createZip = (req, res) => {
  const output = fs.createWriteStream('reports.zip');
  const archive = archiver('zip', {
    zlib: { level: 9 } // Compression level
  });

  output.on('close', function () {
    console.log(`Zip file created: ${archive.pointer()} total bytes`);
    res.download('reports.zip');
  });

  archive.on('error', function (err) {
    res.status(500).send({ error: err.message });
  });

  archive.pipe(output);

  // Add reports data to zip file
  archive.append(JSON.stringify(req.body.reports), { name: 'reports.json' });

  archive.finalize();
};

// Endpoint for zipping and downloading reports
app.post('/api/reports/zip', (req, res) => {
  createZip(req, res);
});


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
dbConfig();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes)

// Backend example (express.js)
app.get('/api/reports', (req, res) => {
  // Tusaale ahaan, xogta waxaa laga heli karaa database-ka
  const reports = [
    { title: 'Report 1', description: 'This is a test report', date: '2025-01-30' },
    { title: 'Report 2', description: 'This is another report', date: '2025-01-29' },
  ];
  res.json(reports);
});
;

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
