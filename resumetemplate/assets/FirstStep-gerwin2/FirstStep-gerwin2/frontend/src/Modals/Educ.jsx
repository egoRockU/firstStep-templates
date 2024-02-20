import React, { useState, useEffect } from 'react';

function Educ({ onClose, onSubmit, onEdit, formIndex, initialData }) {
  const [formData, setFormData] = useState({
    schoolName: '',
    degree: '',
    program: '',
    startDate: '',
    endDate: '',
    grade: ''
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
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        schoolName: '',
        degree: '',
        program: '',
        startDate: '',
        endDate: '',
        grade: ''
      });
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-xl w-1/4">
        <h2 className="text-2xl font-semibold mb-4">Education Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="schoolName" className="block font-semibold">School Name:</label>
            <input type="text" id="schoolName" name="schoolName" value={formData.schoolName} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="degree" className="block font-semibold">Degree:</label>
            <input type="text" id="degree" name="degree" value={formData.degree} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="program" className="block font-semibold">Program:</label>
            <input type="text" id="program" name="program" value={formData.program} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block font-semibold">Start Date:</label>
            <input type="date" id="startDate" name="startDate" 
            value={formData.startDate ? new Date(formData.startDate).toISOString().substring(0, 10) : ''} 
            onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="endDate" className="block font-semibold">End Date:</label>
            <input type="date" id="endDate" name="endDate" 
            value={formData.endDate ? new Date(formData.endDate).toISOString().substring(0, 10) : ''} 
            onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="grade" className="block font-semibold">Grade:</label>
            <input type="text" id="grade" name="grade" value={formData.grade} onChange={handleChange} className="border border-gray-300 rounded-md px-4 py-2 w-full" />
          </div>
          <div className="flex justify-end mb-4">
            {initialData && (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
            )}
            <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2">
              Cancel
            </button>

            {!initialData && 
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
              </button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default Educ;
