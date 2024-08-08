import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProfile } from "../../redux/api/userApi";
import useFontClass from "../../common/useFontClass";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem('access');

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  address: Yup.string().required("address is required"),
  gender: Yup.string().required("Gender is required"),
});

function PersonalInformationForm(
  {user_name,
  gender, 
  email,
  phone_num,
  address,
  isEditing,
  setIsEditing,
}
) {
  const [profile, setProfile] = useState({
    username: user_name || "",
    gender: gender || "",
    email: email || "",
    phoneNumber: phone_num || "",
    address: address || "",
  });

  const handleSubmit = async (profile, { setSubmitting }) => {
    console.log(profile);
    
    try {
      await updateProfile(token, profile);

      setProfile(profile); // Update the profile state with the new values
      setIsEditing(false); // Exit edit mode after submission
      toast.success(<div className={`${useFontClass}`}>Personal info have been updated.</div>);
    } catch (error) {
      if (error.response) {
        console.error("Error data:", error.response.data);
        console.error("Error status:", error.response.status);
        console.error("Error headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      toast.error(<div className={`${useFontClass}`}>Username has already exist.</div>);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col px-6 py-6 text-base font-medium text-black bg-slate-50 rounded-lg max-md:px-5 dark:bg-gray-900 dark:text-gray-300">
      <div className="text-xl font-semibold max-md:max-w-full text-left">
        PERSONAL INFORMATION
      </div>

      {isEditing ? (
        <Formik
          initialValues={profile}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mt-6 max-md:max-w-full text-left">
                <label htmlFor="user_name" className="block">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="mt-6 max-md:max-w-full text-left">
                <label htmlFor="gender" className="block pb-2">
                  Gender
                </label>
                <div role="group" aria-labelledby="gender">
                  <label>
                    <Field className="mr-1" type="radio" name="gender" value="Male" />
                    Male
                  </label>
                  <label className="ml-4">
                    <Field type="radio" name="gender" value="Female" />
                    Female
                  </label>
                  <label className="ml-4">
                    <Field type="radio" name="gender" value="Other" />
                    Other
                  </label>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="mt-6 max-md:max-w-full text-left">
                <label htmlFor="email" className="block">
                  Email address
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="mt-6 max-md:max-w-full text-left">
                <label htmlFor="phone_num" className="block">
                  Phone Number
                </label>
                <Field
                  name="phoneNumber"
                  type="tel"
                  className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="mt-6 max-md:max-w-full text-left">
                <label htmlFor="address" className="block">
                  Address
                </label>
                <Field
                  name="address"
                  type="text"
                  className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 mt-1"
                />
              </div>

              <div className="flex justify-end mt-6">
              <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-8 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-2 px-10 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-900"
                >
                  Save
                </button> 
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className=" max-md:max-w-full text-left">
          <div className="mt-6 max-md:max-w-full text-left">
            <label className="block mb-2">Username</label>
            <div className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full">
              {profile.username}
            </div>
          </div>

          <div className="mt-6 max-md:max-w-full text-left">
            <label className="block mb-2">Gender</label>
            <div className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full">
              {profile.gender || "Unknow"}
            </div>
          </div>

          <div className="mt-6 max-md:max-w-full text-left">
            <label className="block mb-2">Email address</label>
            <div className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full">
              {profile.email}
            </div>
          </div>

          <div className="mt-6 max-md:max-w-full text-left">
            <label className="block mb-2">Phone Number</label>
            <div className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full">
              {profile.phoneNumber || "+855"}
            </div>
          </div>

          <div className="mt-6 max-md:max-w-full text-left">
            <label className="block mb-2">Address</label>
            <div className="w-full px-3 py-4 mt-3 rounded-lg border border-solid bg-stone-300 bg-opacity-0 border-neutral-400 max-md:pr-5 max-md:max-w-full">
              {profile.address || "No location"}
            </div>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-4 py-2 bg-primary-800 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Edit information
          </button>
        </div>
      )} 
    </div>
    </>
  );
}

export default PersonalInformationForm;
