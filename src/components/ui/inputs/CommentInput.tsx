"use client";

import { ErrorMessage } from "./ErrorMessage";
import { forwardRef, useEffect, useRef } from "react";
import { useState } from "react";
import { UseFormTrigger } from "react-hook-form";

interface PropsCommentInput
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  errorMessage?: string;
  styles?: string;
  height?: string;
  isHasLabelMargin?: boolean;
}

export const CommentInput: React.FC<PropsCommentInput> = forwardRef(
  (
    {
      label,
      errorMessage,
      value,
      styles,
      name,
      height = "45px",
      isHasLabelMargin = true,
      ...rest
    },
    _ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    }, [value]);

    return (
      <div className="relative w-full">
        <label
          htmlFor={name}
          className={`${isHasLabelMargin ? "block mb-[4px]" : ""}`}
        >
          <span
            className={`${
              !!errorMessage ? "text-[#B00000]" : "text-[#212833]"
            } text-[18px] font-medium leading-[27px]`}
          >
            {label}
          </span>
        </label>
        <textarea
          {...rest}
          ref={textareaRef}
          id={name}
          value={value}
          rows={1}
          style={{ minHeight: height }}
          className={`overflow-hidden block w-full px-[8px] py-[12px] rounded-[10px] border-[1px] bg-transparent resize-none ${
            !!errorMessage
              ? "border-[#B00000] placeholder:text-[#B00000] outline-[#B00000]"
              : "placeholder:text-[#B6BBEB] border-[#B6BBEB] outline-[#4855CC]"
          } transition duration-[350ms] outline-1 text-[#070600] text-[14px] font-normal ${styles}`}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  }
);

CommentInput.displayName = "CommentInput";
