import React from "react";
import Button from "./Button";

interface IProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<IProps> = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-96 lg:w-1/3 max-w-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="mt-8 flex justify-center space-x-4">
          <Button 
            title="Yes, I'm sure" 
            onClick={onConfirm}  
            className="text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          />
          <Button 
            title="No, cancel" 
            onClick={onClose} 
            type="button" 
            className="py-2.5 px-5 ms-3 text-sm font-medium !text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:!bg-gray-100 hover:!text-sky-800"
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
