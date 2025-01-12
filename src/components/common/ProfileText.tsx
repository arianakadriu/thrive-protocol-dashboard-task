import React from 'react';

interface IProps {
  label: string;
  value: string;
}

const ProfileText: React.FC<IProps> = ({ label, value }) => (
  <div className="flex justify-between text-gray-700">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export default ProfileText;
