import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import Header from '../components/Header';
import { PlusIcon, DocumentTextIcon, HeartIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch reports and vitals in parallel
        const [reportsRes, vitalsRes] = await Promise.all([
          api.get('/reports/timeline'),
          api.get('/vitals'),
        ]);

        // Add 'type' to each item for easy rendering
        const reports = reportsRes.data.map((item) => ({
          ...item,
          type: 'report',
          date: item.reportDate,
        }));
        const vitals = vitalsRes.data.map((item) => ({ ...item, type: 'vitals' }));

        // Combine and sort by date descending
        const combined = [...reports, ...vitals].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setTimeline(combined);
      } catch (err) {
        setError('Failed to fetch timeline data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Health Timeline</h1>
        <div className="space-x-3">
          <Link
            to="/add-vitals"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
          >
            <HeartIcon className="-ml-1 mr-2 h-5 w-5" />
            Add Vitals
          </Link>
          <Link
            to="/upload-report"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Upload Report
          </Link>
        </div>
      </div>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && timeline.length === 0 && (
        <div className="text-center py-10 bg-white shadow rounded-lg">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No entries yet</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by uploading a report or adding vitals.</p>
        </div>
      )}

      {!loading && timeline.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {timeline.map((item) => (
              <li key={item._id}>
                {item.type === 'report' ? (
                  <Link to={`/report/${item._id}`} className="block hover:bg-gray-50">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                           <DocumentTextIcon className="h-10 w-10 text-teal-500" />
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="text-sm font-medium text-teal-600 truncate">{item.reportName}</p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <span className="truncate">{item.aiSummary.substring(0, 100)}...</span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <p className="text-sm text-gray-900">
                              Date: {formatDate(item.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="block px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                       <div className="flex-shrink-0">
                           <HeartIcon className="h-10 w-10 text-green-500" />
                        </div>
                       <div className="min-w-0 flex-1 px-4">
                         <p className="text-sm font-medium text-green-600 truncate">Manual Vitals Entry</p>
                         <p className="text-sm text-gray-900">
                           Date: {formatDate(item.date)}
                         </p>
                         <div className="mt-2 flex space-x-4 text-sm text-gray-700">
                           {item.bloodPressure && <span>BP: <strong>{item.bloodPressure}</strong></span>}
                           {item.bloodSugar && <span>Sugar: <strong>{item.bloodSugar}</strong></span>}
                           {item.weight && <span>Weight: <strong>{item.weight} kg</strong></span>}
                         </div>
                         {item.notes && <p className="mt-1 text-sm text-gray-500">Notes: {item.notes}</p>}
                       </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}