import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { updateProfile } from "../../redux/api/userApi";
import useFontClass from "../../common/useFontClass";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem("access");

const BioComponent = ({ bio }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempBio, setTempBio] = useState(bio || "No description bio..!");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setTempBio(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await updateProfile(token, { bio: tempBio });

      setIsEditing(false); // Exit edit mode after successful submission
      toast.success(<div className={`${useFontClass}`}>Bio has been updated.</div>);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(<div className={`${useFontClass}`}>Failed to update bio.</div>);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col px-4 pb-4 h-auto bg-slate-50 rounded-lg max-md:max-w-full dark:bg-gray-900">
      <div className="flex gap-5 justify-between text-xl font-semibold text-black whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
        <h3 className="mt-2 max-md:mt-2 max-md:text-sm dark:text-gray-300">BIO</h3>
        <div
          className="p-1 mt-2 max-md:mt-0 rounded-md hover:bg-gray-200 cursor-pointer dark:text-gray-300 dark:hover:bg-gray-800"
          onClick={handleEdit}
        >
          <FaEdit className="fill-gray-700 max-md:w-[16px] dark:fill-gray-300" />
        </div>
      </div>
      {isEditing ? (
        <div>
        <textarea
        rows="6"
          className="self-start w-full rounded-md mt-4 ml-0.5 text-left text-md font-medium text-neutral-500 max-md:mt-2 max-md:text-sm max-md:max-w-full dark:bg-gray-800 dark:text-gray-300"
          value={tempBio}
          onChange={handleChange}
        />
        <div className="flex justify-end">
        <button
          className="py-1.5 px-8 bg-primary-800 text-white rounded-lg hover:bg-primary-900 max-md:text-sm"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Save
        </button>
        </div>
        </div>
      ) : (
        <div className="self-start rounded-lg mt-4 text-left text-md font-medium text-neutral-500 max-md:mt-2 max-md:text-sm max-md:max-w-full line-clamp-6 dark:text-gray-300">
          <p>{tempBio}</p>
        </div>
      )}
    </div>
    </>
  );
};

export default BioComponent;
