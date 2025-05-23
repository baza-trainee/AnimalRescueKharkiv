"use client";

import { ErrorMessage } from "./ErrorMessage";
import { forwardRef } from "react";
import { useState } from "react";

interface PropsCommentInput
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  label: string;
  styles?: string;
  initialHeight?: string;
  labelMargin?: boolean;
}

export const CommentInput: React.FC<PropsCommentInput> = forwardRef(
  (
    {
      label,
      errorMessage,
      styles,
      name,
      initialHeight = "66px",
      labelMargin = true,
      ...rest
    },
    _ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const [height, setHeight] = useState(initialHeight);

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
      const textarea = event.target as HTMLTextAreaElement;
      setHeight("auto");
      setHeight(`${textarea.scrollHeight}px`);
    };

    return (
      <div className="relative w-full">
        <label
          htmlFor={name}
          className={`${labelMargin ? "block mb-[4px]" : ""}`}
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
          ref={_ref}
          id={name}
          onInput={handleInput}
          style={{ height }}
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
