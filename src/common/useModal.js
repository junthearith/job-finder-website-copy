import { useState } from 'react';

/**
 * Custom hook to handle modal state.
 * 
 * @returns {object} - An object containing modal state and functions to open and close the modal.
 */
const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
