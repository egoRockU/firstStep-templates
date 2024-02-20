import React, { useState, useEffect } from "react";

function Certificates({ onClose, onSubmit, onEdit, formIndex, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    image: null, 
    document: "",
    description: "",
    dateReceived: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);  

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });

      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setImagePreview(null); // Reset image preview
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
      setFormData(initialData)
    } else {
      setFormData({
        title: "",
        image: null,
        document: "",
        description: "",
        dateReceived: "",
      });
      setImagePreview(null);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-xl w-1/4">
        <h2 className="text-2xl font-semibold mb-4">Awards</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold">
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateReceived" className="block font-semibold">
              Date Received:
            </label>
            <input
              type="date"
              id="dateReceived"
              name="dateReceived"
              value={formData.dateReceived ? new Date(formData.dateReceived).toISOString().substring(0, 10) : ''}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-semibold">
              Image:
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Selected Image"
                className="max-w-full h-auto"
              />
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-semibold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="text-right">
            {initialData && (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={handleCancel}
              className="mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              Cancel
            </button>
            {!initialData && 
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
              </button>
            }
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Certificates;
