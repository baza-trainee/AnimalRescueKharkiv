import { useEffect, useState } from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => setIsOpen((prev) => !prev);
  const openModal = () => setIsOpen(true); 
  const closeModal = () => setIsOpen(false);

  useEffect(() =>  {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return { isOpen, toggleModal,openModal, closeModal };
};
