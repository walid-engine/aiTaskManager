// src/components/FormField.jsx
import React from 'react';

const FormField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormField;