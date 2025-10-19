import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function ViewReport() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [view, setView] = useState('en'); // 'en' or 'ur' for toggle 

  const backendUrl = 'http://localhost:5001'; // Your backend URL

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/reports/${id}`);
        setReport(data);
      } catch (err) {
        setError('Failed to fetch report details.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center py-10">{error}</p>;
  if (!report) return null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center mb-4 text-sm font-medium text-teal-600 hover:text-teal-800"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Timeline
      </Link>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{report.reportName}</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Report Date: {new Date(report.reportDate).toLocaleDateString()}
          </p>
        
          {/* // Ab yeh hoga (direct Cloudinary URL): */}
<a
  href={report.filePath} // Sirf filePath, jo ab poora URL hai
  target="_blank"
  rel="noopener noreferrer"
  className="mt-2 inline-block text-sm font-medium text-teal-600 hover:text-teal-500"
>
  View Original File
</a>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            AI-Powered Analysis (Sehat ka Smart Dost)
          </h2>
          
          {/* Bilingual Toggle */}
          <div className="mb-4">
            <span className="isolate inline-flex rounded-md shadow-sm">
              <button
                type="button"
                onClick={() => setView('en')}
                className={`relative inline-flex items-center rounded-l-md border px-4 py-2 text-sm font-medium ${
                  view === 'en'
                    ? 'bg-teal-600 text-white border-teal-600 z-10'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setView('ur')}
                className={`relative -ml-px inline-flex items-center rounded-r-md border px-4 py-2 text-sm font-medium ${
                  view === 'ur'
                    ? 'bg-teal-600 text-white border-teal-600 z-10'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Roman Urdu
              </button>
            </span>
          </div>

          {/* AI Summary Section */}
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-2 bg-teal-50 p-4 rounded-lg">
              <dt className="text-sm font-medium text-gray-500">
                {view === 'en' ? 'Simple Summary' : 'Aasan Khulaasa'}
              </dt>
              <dd className="mt-1 text-md text-gray-900" style={{ dir: view === 'ur' ? 'rtl' : 'ltr' }}>
                {view === 'en' ? report.aiSummary : report.aiRomanUrduSummary}
              </dd>
            </div>

            {report.aiAbnormalValues && report.aiAbnormalValues.length > 0 && (
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-red-600">
                  {view === 'en' ? 'Abnormal Values Highlighted' : 'Ghair Mamooli Values'} 
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="list-disc list-inside">
                    {report.aiAbnormalValues.map((item, index) => (
                      <li key={index}>
                        <strong>{item.parameter}:</strong> {item.value} ({item.remark})
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-blue-600">
                {view === 'en' ? 'Questions to Ask Your Doctor' : 'Doctor se Poochne Walay Sawaal'} 
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                 <ul className="list-disc list-inside">
                    {report.aiDoctorQuestions.map((q, index) => (
                      <li key={index}>{q}</li>
                    ))}
                  </ul>
              </dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-green-600">
                {view === 'en' ? 'Food Suggestions' : 'Ghizaai Tajaweez'} 
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{report.aiFoodSuggestions}</dd>
            </div>
            
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-yellow-600">
                {view === 'en' ? 'Home Remedies' : 'Ghrelu Totkay'} 
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{report.aiHomeRemedies}</dd>
            </div>
          </dl>
          
          {/* Disclaimer */}
          <div className="mt-8 border-t border-gray-200 pt-4">
             <p className="text-sm text-gray-500">
                <strong>{view === 'en' ? 'Disclaimer:' : 'Disclaimer:'}</strong> 
                {view === 'en' 
                  ? ' AI is for understanding only, not for medical advice. Always consult your doctor.'
                  : ' Yeh AI sirf samajhne ke liye hai, ilaaj ke liye nahi. Hamesha apne doctor se mashwara karein.'
                }
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}