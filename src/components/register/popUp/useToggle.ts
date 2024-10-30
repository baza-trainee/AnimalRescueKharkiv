import { useEffect, useState } from "react";

export const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return { isOpen, toggleModal };
};
