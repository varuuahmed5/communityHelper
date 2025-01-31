import React, { useState, useEffect } from 'react';
import ReportCard from '../components/reportCard';
import { getReports } from '../services/reportService';
import Loader from '../components/Loader';

import axios from 'axios';

const submitReport = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/reports', {
      title: 'Example Report',
      description: 'Test report',
      userId: '123456',
    });

    console.log('Report submitted:', response.data);
  } catch (error) {
    console.error('Error submitting report:', error);
  }
};

submitReport();


const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const fetchedReports = await getReports();
      setReports(fetchedReports);
      setLoading(false);
    };
    fetchReports();
  }, []);

  return (
    <div className="p-6">
      {loading ? <Loader /> : (
        <div>
          {reports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
