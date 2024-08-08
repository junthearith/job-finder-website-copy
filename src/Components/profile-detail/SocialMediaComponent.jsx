import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProfile } from "../../redux/api/userApi";
import useFontClass from "../../common/useFontClass";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const token = localStorage.getItem("access");

function SocialMediaComponent({ contact_info }) {
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState({});
  const [contacts, setContacts] = useState(contact_info || {});

  useEffect(() => {
    setContacts(contact_info);
  }, [contact_info]);

  const handleEdit = (platform) => {
    setEditing((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const platforms = ["facebook", "twitter", "instagram", "linkedin"];

  const getInitialValues = () => {
    return platforms.reduce((acc, platform) => {
      acc[platform] = contacts[platform] || "";
      return acc;
    }, {});
  };

  const getValidationSchema = () => {
    return Yup.object(
      platforms.reduce((acc, platform) => {
        if (editing[platform]) {
          acc[platform] = Yup.string()
            .url("Invalid URL format")
            .required("Required");
        }
        return acc;
      }, {})
    );
  };

  const handleSubmit = async (values) => {
    try {
      await updateProfile(token, { contact_info: values });
      setContacts(values);
      setOpenModal(false);
      toast.success(<div className={`${useFontClass}`}>Social Media have been added.</div>);
    } catch (error) {
      console.error("Failed to submit social media data:", error);
      toast.error(<div className={`${useFontClass}`}>Failed to add social media.</div>);
    }
  };

  return (
    <section className="px-4 text-base font-semibold text-black bg-slate-50 rounded-lg max-md:gap-1 max-md:max-w-full dark:bg-gray-900">
      <div className="flex items-start px-px text-xl max-md:flex-wrap max-md:max-w-full"></div>
      <h3 className="flex-auto text-xl text-left mb-4 mt-2 max-md:pb-2 max-md:text-sm dark:text-gray-300">
        SOCIAL MEDIA ACCOUNT
      </h3>

      {/* Render social media links with icons */}
      {Object.keys(contacts).length > 0 ? (
        <div className="grid grid-cols-2 gap-4 mb-2 max-md:grid-cols-1">
          {platforms.map((platform) => (
            contacts[platform] ? (
              <a
                key={platform}
                href={contacts[platform]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 p-2 border border-gray-300 rounded-lg"
              >
                <img
                  src={`path_to_icons/${platform}.png`} // Replace with the correct path to your icons
                  alt={`${platform} icon`}
                  className="w-6 h-6"
                />
                <span className="text-gray-700 dark:text-gray-300">{platform}</span>
              </a>
            ) : null
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No social media links available.
        </div>
      )}

      <button
        onClick={() => setOpenModal(true)}
        className="w-1/4 justify-center items-center py-2 mb-4 rounded-lg border border-solid bg-gray-400 bg-opacity-0 hover:bg-gray-200 border-gray-400 max-md:py-2 max-md:max-w-1/4 dark:text-gray-300 dark:hover:bg-gray-800 dark:border-gray-300"
      >
        + Add
      </button>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add Social Media</Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={getInitialValues()}
            validationSchema={getValidationSchema()}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                {platforms.map((platform) => (
                  <div key={platform} className="mb-4">
                    <h4 className="mb-2 text-xl">{platform}</h4>
                    {editing[platform] ? (
                      <>
                        <div className="flex flex-col mb-2">
                          <label className="text-md text-gray-700">
                            {platform} URL
                          </label>
                          <Field
                            className="text-sm rounded-lg dark:bg-gray-600"
                            type="text"
                            name={platform}
                          />
                          <ErrorMessage
                            name={platform}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleEdit(platform)}
                          className="flex flex-row p-1 items-center rounded-lg text-gray-700 hover:bg-gray-200 dark:text-red-600 dark:hover:bg-slate-600"
                        >
                          <FaTrashAlt />
                          &nbsp;Remove
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEdit(platform)}
                        className="flex flex-row p-1 items-center rounded-lg text-blue-700 hover:bg-blue-200 dark:hover:bg-slate-600"
                      >
                        <IoMdAdd />
                        &nbsp;Add {platform}
                      </button>
                    )}
                  </div>
                ))}
                <Modal.Footer className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-1 px-5 hover:bg-blue-700 rounded-md"
                  >
                    Save
                  </button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </section>
  );
}

export default SocialMediaComponent;
