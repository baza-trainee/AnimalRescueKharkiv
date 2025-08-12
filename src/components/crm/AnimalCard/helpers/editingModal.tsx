import React from "react";
import CloseBtb from "../../CatalogCrm/CatalogCrmIcons/Closebtn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className=" bg-white rounded-[10px] px-6 py-4 w-[358px] shadow-xl">
              <div className="flex justify-end mb-4">
          <button   onClick={onClose}><CloseBtb/></button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;