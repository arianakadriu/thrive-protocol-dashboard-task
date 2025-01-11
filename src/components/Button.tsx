import React from 'react';

interface IProps {
  title: string;
  onClick: () => void;
}

const Button: React.FC<IProps> = ({ title, onClick }) => {
  return (
    <button 
      type="button" 
      onClick={onClick}
      className="inline-flex w-auto justify-center rounded-md bg-sky-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-950"
    >
      {title}
    </button>
  );
};

export default Button;
