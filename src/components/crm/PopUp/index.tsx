import { FC, ReactNode, SyntheticEvent, useEffect } from "react";
import { CloseModalIcon } from "../../ui/icon/CloseModalIcon";

interface PropsPopUp {
  onClose: () => void;
  children: ReactNode;
  gap?: string;
}

export const PopUp: FC<PropsPopUp> = ({ onClose, children, gap }) => {
  const onClickOverlay = (e: SyntheticEvent<EventTarget>) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="relative z-[25]"
      aria-labelledby="modal"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          onClick={onClickOverlay}
          className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <div
            className={`relative transform overflow-hidden rounded-[10px] bg-white text-left shadow-xl transition-all xl:w-[472px] w-[358px] px-[24px] py-[12px] flex flex-col gap-[${
              gap ? gap : "20px"
            }] items-center justify-center`}
          >
            <button type="button" className=" ml-auto" onClick={onClose}>
              <CloseModalIcon style="fill-[#4855CC]  transition duration-[350ms] hover:fill-[#3442c7] focus:fill-[#3442c7] " />
            </button>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
