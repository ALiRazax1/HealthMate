import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import UploadReport from './pages/UploadReport';
import AddVitals from './pages/AddVitals';
import ViewReport from './pages/ViewReport';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <main>
        <Routes>
          {/* Public Routes */}
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload-report" element={<UploadReport />} />
            <Route path="/add-vitals" element={<AddVitals />} />
            <Route path="/report/:id" element={<ViewReport />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;