import React, { useState } from 'react';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { ICharacter } from '../../types/ICharacter';

interface IProps {
  updatedProfile: ICharacter;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  handleCancel: () => void;
}

const ProfileForm: React.FC<IProps> = ({ updatedProfile, handleInputChange, handleSave, handleCancel }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!updatedProfile.name) newErrors.name = 'Name is required';
    if (!updatedProfile.species) newErrors.species = 'Species is required';
    if (!updatedProfile.gender) newErrors.gender = 'Gender is required';
    if (!updatedProfile.status) newErrors.status = 'Status is required';

    if (!updatedProfile.origin.name) newErrors.origin = 'Origin is required';
    if (!updatedProfile.location.name) newErrors.location = 'Location is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleInputChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', 
    }));

    handleInputChange(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      handleSave();
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InputField
            label="Name"
            name="name"
            value={updatedProfile.name}
            onChange={handleInputChangeWithValidation}
            error={errors.name}
          />
          <InputField
            label="Species"
            name="species"
            value={updatedProfile.species}
            onChange={handleInputChangeWithValidation}
            error={errors.species}
          />
          <InputField
            label="Gender"
            name="gender"
            value={updatedProfile.gender}
            onChange={handleInputChangeWithValidation}
            error={errors.gender}
          />
          <InputField
            label="Status"
            name="status"
            value={updatedProfile.status}
            onChange={handleInputChangeWithValidation}
            error={errors.status}
          />
          <InputField
            label="Origin"
            name="origin"
            value={updatedProfile.origin.name}
            onChange={handleInputChangeWithValidation}
            error={errors.origin}
          />
          <InputField
            label="Location"
            name="location"
            value={updatedProfile.location.name}
            onChange={handleInputChangeWithValidation}
            error={errors.location}
          />
        </div>

        <div className="mt-9 flex justify-center space-x-4">
          <Button title="Save" type="submit" />
          <Button title="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
