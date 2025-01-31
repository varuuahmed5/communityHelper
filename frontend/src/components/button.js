import React from 'react';

const Button = ({ label, onClick, type = 'button', className, variant = 'primary' }) => {
  const getButtonClass = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      case 'outline':
        return 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-6 py-2 rounded-md ${getButtonClass()} ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
