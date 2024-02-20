import React, { useState, useEffect } from 'react';

function Awards({ onClose, onSubmit, onEdit, formIndex, initialData }) {
  const [formData, setFormData] = useState({
    title: '',
    dateReceived: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleEdit = (e) => {
    e.preventDefault();
    onEdit(formIndex, formData);
    onClose();
  }

  const handleCancel = () => {
    onClose();
    if (initialData){
      setFormData(initialData)
    } else {
      setFormData({
        title: '',
        dateReceived: '',
        description: ''
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-xl w-1/4">
        <h2 className="text-2xl font-semibold mb-4">Awards</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">Title:</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="dateReceived" className="block font-semibold">Date Received:</label>
            <input type="date" id="dateReceived" name="dateReceived" 
            value={formData.dateReceived ? new Date(formData.dateReceived).toISOString().substring(0, 10) : ''} 
            onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold">Description:</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          {initialData && (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
            )}
          <div className="text-right">
            <button type="button" onClick={handleCancel} className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none">
              Cancel
            </button>
            {!initialData && 
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
              </button>
            }
          </div>
        </form>
        <button onClick={onClose} className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Awards;
