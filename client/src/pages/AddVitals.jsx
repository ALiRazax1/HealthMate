import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddVitals() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [bloodPressure, setBloodPressure] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/vitals', {
        date,
        bloodPressure,
        bloodSugar,
        weight,
        notes,
      });
      navigate('/'); // Go back to dashboard
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to add vitals.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Add Manual Vitals</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add quick readings like Blood Pressure, Sugar, or Weight .
          </p>

          <form className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-sm sm:col-span-2">{error}</p>}

            <div className="sm:col-span-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-700">
                Blood Pressure (e.g., 120/80)
              </label>
              <input
                type="text"
                name="bloodPressure"
                id="bloodPressure"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="bloodSugar" className="block text-sm font-medium text-gray-700">
                Blood Sugar (e.g., 95)
              </label>
              <input
                type="text"
                name="bloodSugar"
                id="bloodSugar"
                value={bloodSugar}
                onChange={(e) => setBloodSugar(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight (in kg)
              </label>
              <input
                type="text"
                name="weight"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
            
            <div className="sm:col-span-2 text-right">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Vitals'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}