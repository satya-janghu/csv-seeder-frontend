import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

function Navbar() {
  const [serverStatus, setServerStatus] = useState('offline');

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        await axios.get(`${config.API_BASE_URL}/api/tasks`);
        setServerStatus('online');
      } catch (error) {
        setServerStatus('offline');
      }
    };

    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
            <Link to="/tasks" className="text-gray-800 hover:text-blue-600">Tasks</Link>
          </div>
          <div className="flex items-center space-x-2">
            <span>Server Status:</span>
            <div className={`h-3 w-3 rounded-full ${
              serverStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
            <span className="text-sm">{serverStatus}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 