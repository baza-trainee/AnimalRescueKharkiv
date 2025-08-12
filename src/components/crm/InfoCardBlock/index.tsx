import { ReactNode } from "react";
import { ICONS } from "../../../constants/icons/icons";

interface InfoCardBlockProps {
  title?: string;
  children: ReactNode;
  titleNode?: ReactNode;
  onEdit?: () => void;
  showEditButton?: boolean;
  titleClassName?: string;
}
export default function InfoCardBlock({
  title,
  children,
  onEdit,
  titleNode,
  showEditButton = true,
  titleClassName = "",
}: InfoCardBlockProps) {
  return (
    <div
      className="mt-5 border rounded-[10px] px-3 py-2 min-h-[60px] bg-crm-backgraund"
      style={{
        boxShadow:
          "4px 4px 10px rgba(182, 187, 235, 0.3), -4px -4px 10px rgba(182, 187, 235, 0.3)",
      }}
    >
      <div className="flex justify-between items-start">
       {titleNode ? (
    <div className={titleClassName}>{titleNode}</div>
  ) : (
    <p className={`font-medium text-lg text-crm-secondary-blue ${titleClassName}`}>
      {title}
    </p>
  )}
        {showEditButton && (
          <button onClick={onEdit}>
            <ICONS.EDIT_BTN />
          </button>
        )}
      </div>

     
      <div className="flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
}