import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        // Dispatch the file upload action
        const response = await dispatch(uploadUserFile(file)).unwrap();
        setSuccessMessage("File uploaded successfully!");
        console.log(response); // Optional: log the response for debugging
      } catch (error) {
        setError("Failed to upload file. Please try again.");
        console.error(error);
      }
    } else {
      setError("Please select a file before uploading.");
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default FileUpload;
