import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import config from '../config';

function Home() {
  const [taskName, setTaskName] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !taskName) {
      alert('Please provide both a task name and a CSV file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', taskName);

    try {
      await axios.post(`${config.API_BASE_URL}/api/tasks`, formData);
      navigate('/tasks');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Upload CSV File</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Name</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter task name"
            />
          </div>

          <div {...getRootProps()} className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md ${
            isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
          }`}>
            <div className="space-y-1 text-center">
              <input {...getInputProps()} />
              <div className="flex text-sm text-gray-600">
                <p className="pl-1">
                  {file ? file.name : "Drag 'n' drop a CSV file here, or click to select"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={uploading}
              className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {uploading ? 'Uploading...' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              View Tasks
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home; 