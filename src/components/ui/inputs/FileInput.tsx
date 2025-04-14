"use client";

import React, { forwardRef, useRef, useState } from "react";
import { PlusIcon } from "../icon/PlusIcon";
import { ErrorMessage } from "./ErrorMessage";

interface PropsFileInput extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label: string;
}

interface FilePreview {
  fileUrl: string;
  type: string;
}

type FileInputProps = PropsFileInput & {
  onChange: (files: FileList | null) => void;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  (
    { label, errorMessage, name, onChange, value, ...rest },
    _ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previews, setPreviews] = useState<FilePreview[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files) return;
      const fileUrls = Array.from(files).map((file) => {
        const fileUrl = URL.createObjectURL(file);
        return { fileUrl, type: file.type };
      });

      setPreviews(fileUrls);

      if (onChange) {
        onChange(files);
      }
    };

    const handleClearFiles = () => {
      setPreviews([]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      if (onChange) {
        onChange(null);
      }
    };

    return (
      <div className="w-[318px] relative">
        <label
          htmlFor={name}
          className="flex flex-col gap-8px] relative cursor-pointer"
        >
          <span
            className={`${
              !!errorMessage ? "text-[#B00000]" : "text-[#070600]"
            } block text-[18px] font-medium leading-[27px] mb-[4px] text-left`}
          >
            {label}
          </span>
          <input
            {...rest}
            ref={(el) => {
              if (_ref) {
                if (typeof _ref === "function") _ref(el);
                else _ref.current = el;
              }
              inputRef.current = el;
            }}
            type="file"
            id={name}
            onChange={handleFileChange}
            className="absolute top-0 left-0 w-[0px] h-[0px] z-[-10] opacity-0"
          />
          <div className="flex flex-col justify-center items-center">
            <div
              className={`flex justify-center items-center w-[240px] h-[240px] bg-[#EDEEFA] rounded-[10px] ${
                previews.length !== 0 && "hidden"
              }`}
            >
              <PlusIcon style={"fill-[#F8F9FD]"} />
            </div>
            {previews.length !== 0 && (
              <div className="px-[16px] py-[8px] mb-[8px] bg-[#B6BBEB] rounded-[10px]">
                <span>Вибрати інші файли</span>
              </div>
            )}
          </div>
        </label>

        <ul
          className={`flex gap-[12px] overflow-x-auto flex-nowrap ${
            previews.length === 1 && "justify-center items-center"
          }`}
        >
          {previews.map((file, index) => {
            if (file.type.includes("video")) {
              return (
                <li
                  key={index}
                  className="shrink-0 overflow-hidden w-[240px] h-[240px] rounded-lg"
                >
                  <video
                    src={file.fileUrl}
                    controls
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </li>
              );
            } else if (file.type.includes("image")) {
              return (
                <li
                  key={index}
                  className="shrink-0 overflow-hidden w-[240px] h-[240px] rounded-lg"
                >
                  <img
                    src={file.fileUrl}
                    alt="preview"
                    width={240}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </li>
              );
            } else {
              return (
                <li
                  key={index}
                  className="shrink-0 overflow-hidden w-[240px] h-[240px] rounded-lg"
                >
                  <div className="w-full h-full flex justify-center items-center bg-gray-200">
                    <span className="font-medium">Недопустимий формат</span>
                  </div>
                </li>
              );
            }
          })}
        </ul>

        {previews.length !== 0 && (
          <div className="flex justify-center mt-[8px]">
            <button
              type="button"
              onClick={handleClearFiles}
              className="px-[16px] py-[8px] bg-[#B6BBEB] rounded-[10px]"
            >
              Очистити вибір
            </button>
          </div>
        )}

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

FileInput.displayName = "FileInput";
