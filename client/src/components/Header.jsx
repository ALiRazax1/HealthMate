import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeftOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-teal-600 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-white">HealthMate</span>
            </Link>
          </div>
          <div className="flex items-center">
              <>
                <span className="mr-4 text-sm font-medium text-White">
                  <UserIcon className="h-5 w-5 inline-block mr-1" />
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 cursor-pointer"
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
           
          </div>
        </div>
      </nav>
    </header>
  );
}