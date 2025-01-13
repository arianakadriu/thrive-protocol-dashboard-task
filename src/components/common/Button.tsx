import React from 'react';

interface IProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string; 
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<IProps> = ({ title, onClick, disabled = false, className = '', type = 'button' }) => {
  return (
    <button 
      type={type} 
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex w-auto justify-center rounded-md bg-sky-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-950 ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
