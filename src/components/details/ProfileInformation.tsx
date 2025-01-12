import React, { useState } from "react";
import { ICharacter } from "../../types/ICharacter";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import { useCharacterContext } from "../../context/CharacterContext";
import ProfileText from "../common/ProfileText";
import ProfileForm from "./ProfileForm";

interface IProps {
  profile: ICharacter;
}

const ProfileInformation: React.FC<IProps> = ({ profile }) => {
  const navigate = useNavigate();
  const { updateProfile } = useCharacterContext();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<ICharacter>(profile);

  const goToDashboard = () => {
    navigate("/dashboard/");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "origin" || name === "location") {
      setUpdatedProfile((prevState) => ({
        ...prevState,
        [name]: { name: value },
      }));
    } else {
      setUpdatedProfile((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    updateProfile(updatedProfile);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!profile) {
    return <div>No profile information available.</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
      {!isEditing && (
        <div className="relative bg-gray-100 p-8 flex justify-center items-center">
          <div className="absolute -bottom-10">
            <img
              className="w-24 h-24 rounded-full border-4 border-white shadow-md"
              src={profile.image}
              alt={`${profile.name}'s profile`}
            />
          </div>
        </div>
      )}

        {isEditing ? (
            <div className="text-center mt-6 px-6 pb-6">
          <ProfileForm
            updatedProfile={updatedProfile}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
          />
          </div>
        ) : (
          <div className="text-center mt-12 px-6 pb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {updatedProfile.name}
            </h2>
            <p className="text-sm text-gray-500">Character Profile</p>

            <div className="mt-4 space-y-2">
              <ProfileText label="Species" value={updatedProfile.species} />
              <ProfileText label="Gender" value={updatedProfile.gender} />
              <ProfileText label="Status" value={updatedProfile.status} />
              <ProfileText label="Origin" value={updatedProfile.origin.name} />
              <ProfileText
                label="Location"
                value={updatedProfile.location.name}
              />
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <Button title="Back To Dashboard" onClick={goToDashboard} />
              <Button title="Edit Profile" onClick={handleEdit} />
            </div>
          </div>
        )}
      </div>
  );
};

export default ProfileInformation;
