import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { getReports } from '../services/reportService';

const Dashboard = () => {
  const { authData } = useContext(AuthContext);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getReports();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {authData?.user?.name || 'User'}</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow">New Report</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No reports available</td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="border-b">
                  <td className="px-4 py-2">{report.id}</td>
                  <td className="px-4 py-2">{report.title}</td>
                  <td className="px-4 py-2">{report.status}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:underline">View</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
