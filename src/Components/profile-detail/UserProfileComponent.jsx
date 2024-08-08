import { FaEdit, FaClock } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { fetchUploadUserAvatar } from "../../redux/features/avatar/avatarSlice";
import { updateProfile } from "../../redux/api/userApi";
import useFontClass from "../../common/useFontClass";
import { toast } from "react-toastify";
import ImageViewer from 'react-simple-image-viewer'; // Import ImageViewer
import 'react-toastify/dist/ReactToastify.css';

const token = localStorage.getItem("access");

function UserProfileComponent({
  avatar,
  username,
  address,
  created_at,
  cover,
}) {
  const dispatch = useDispatch();
  const [addressChange, setAddressChange] = useState();
  const [userNameOnChange, setUserNameOnChange] = useState();
  const [avatarSrc, setAvatarSrc] = useState();
  const [avatarSelected, setAvatarSelected] = useState();
  const [file, setFile] = useState(); // State to store the selected file
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage the submission state

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback(() => {
    setCurrentImage(0); // Since there's only one image, it's always the first one
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setIsViewerOpen(false);
  };

  const handleOnChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile: ", selectedFile);
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSelected(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      handleSubmit(selectedFile);
    }
  };

  useEffect(() => {
    setAvatarSrc(avatar);
  }, [avatar]);

  useEffect(() => {
    setAddressChange(address);
  }, [address]);

  useEffect(() => {
    setUserNameOnChange(username);
  }, [username]);

  const handleSubmit = async (file) => {
    if (file) {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await dispatch(fetchUploadUserAvatar(formData)); // Dispatch the action to upload the file
        console.log("response: ", response.payload);

        if (response?.payload?.data?.url) {
          const avatarUrl = response.payload.data.url;
          await updateProfile(token, { avatar: avatarUrl });
          setAvatarSrc(avatarUrl);
        } else {
          alert("Failed to upload avatar. Please try again.");
          console.error("Invalid response structure:", response);
        }
        toast.success(<div className={`${useFontClass}`}>Profile has been updated.</div>);
      } catch (error) {
        console.error(error);
        toast.error(<div className={`${useFontClass}`}>Failed to update profile.</div>);
      }
      setIsSubmitting(false);
    }
  };

  return (
    <article className="flex flex-col h-auto grow bg-slate-50 rounded-lg max-md:max-w-full dark:bg-gray-900">
      <div className="flex relative flex-col pt-2.5 pr-3 pl-5 w-full min-h-[127px] max-md:pl-5 max-md:max-w-full">
        <div className="">
          <img
            loading="lazy"
            src={
              cover ||
              "https://cdn.pixabay.com/photo/2015/06/10/07/03/building-804526_1280.jpg"
            }
            alt="cover"
            className="object-cover rounded-t-lg absolute inset-0 size-full"
          />
        </div>

        <div className="absolute top-20 max-md:top-0">
          <img
            loading="lazy"
            src={avatarSrc || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
            alt="User profile picture"
            className="rounded-lg max-w-full aspect-[1.03] w-[100px] max-md:mt-10 cursor-pointer"
            onClick={openImageViewer}
          />
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <FaEdit className="max-md:w-[16px] absolute left-20 bottom-2 max-md:hidden" />
          </label>
          <input
            id="avatar-upload"
            type="file"
            onChange={handleOnChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="flex flex-col ml-36 max-md:ml-0 max-md:mt-2">
        <div className="flex flex-row gap-2 w-full">
          <h2 className="self-start -mb-2 text-2xl mt-1 font-sowanphum font-semibold leading-7 text-black max-md:ml-5 dark:text-gray-300">
            {userNameOnChange}
          </h2>
        </div>
        <span className="self-start text-sm text-gray-500 font-semibold leading-7 max-md:ml-5 dark:text-gray-300">
          <span className="text-[14px]">@</span>
          {userNameOnChange}
        </span>
      </div>
      <div className="flex justify-between items-end mr-5 ml-5 text-base max-md:flex-wrap max-md:mr-2.5 max-md:mt-3 max-md:pb-2 max-md:max-w-full">
        <div className="flex flex-col mt-2 max-md:mt-0.5">
          <div className="flex gap-2 text-black leading-[175%]">
            <IoHome className="self-center w-4 rounded-full aspect-square fill-gray-700 fill-opacity-50 max-md:w-5 dark:fill-gray-300" />

            <p className="flex-auto text-left my-auto max-md:text-sm dark:text-gray-300">
              {addressChange || "No location"}
            </p>
          </div>
          <div className="flex gap-2 text-black leading-[175%]">
            <FaClock className="self-center w-4 rounded-full aspect-square fill-gray-700 fill-opacity-50 max-md:w-5 dark:fill-gray-300" />
            <p className="flex-auto text-left my-auto max-md:text-sm dark:text-gray-300">
              {created_at || "Unavailable"}
            </p>
          </div>
        </div>
        <div className="flex gap-2 mb-2 text-white whitespace-nowrap max-md:mb-0.5">
          <label
            htmlFor="avatar-upload"
            className="justify-center px-2.5 py-1.5 bg-blue-800 rounded-lg border-2 border-blue-800 border-solid max-md:py-[5px] max-md:text-sm cursor-pointer"
          >
            Edit profile
          </label>
        </div>
      </div>

      {isViewerOpen && (
        <ImageViewer
          src={[avatarSrc]} // Pass avatarSrc as an array
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </article>
  );
}

export default UserProfileComponent;
