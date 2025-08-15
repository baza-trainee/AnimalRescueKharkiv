import React from "react";
import CloseBtb from "../../CatalogCrm/CatalogCrmIcons/Closebtn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
    onSave: () => void;
  title?: string;
  children: React.ReactNode;
  isLoading?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen,
  onClose,
  onSave,
  title,
  children,
  isLoading = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className=" bg-white rounded-[10px] px-6 py-4 w-[358px] shadow-xl">
              <div className="flex justify-end mb-4">
          <button   onClick={onClose}><CloseBtb/></button>
        </div>
        <div>{children}</div>
        <button
        onClick={onSave}
        className={"mt-4 self-end px-4 py-2 rounded text-white bg-blue-600 hover:bg-blue-700"
       }
      >
        Зберегти
      </button>
      </div>
    </div>
  );
};

export default Modal;