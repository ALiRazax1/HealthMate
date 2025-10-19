import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function UploadReport() {
  const [reportName, setReportName] = useState('');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('reportName', reportName);
    formData.append('reportDate', reportDate);
    formData.append('reportFile', file);

    setLoading(true);
    setError('');

    try {
      // Set a longer timeout for this request as AI analysis can take time
      const { data } = await api.post('/reports/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 120000, // 2 minutes
      });
      navigate(`/report/${data._id}`); // Navigate to the new report's view
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Upload failed. The AI analysis may have timed out or failed.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Upload New Medical Report</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload a PDF or image of your report. Our AI will analyze it for you.
          </p>

          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            <div>
              <label htmlFor="reportName" className="block text-sm font-medium text-gray-700">
                Report Name (e.g., "Annual Blood Test")
              </label>
              <input
                type="text"
                name="reportName"
                id="reportName"
                required
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700">
                Report Date
              </label>
              <input
                type="date"
                name="reportDate"
                id="reportDate"
                required
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Report File (PDF, JPG, PNG)</label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-teal-600 hover:text-teal-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                  {file && <p className="text-sm text-green-600 font-medium mt-2">{file.name}</p>}
                </div>
              </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 disabled:opacity-50"
              >
                {loading ? 'Analyzing...' : 'Upload and Analyze'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}