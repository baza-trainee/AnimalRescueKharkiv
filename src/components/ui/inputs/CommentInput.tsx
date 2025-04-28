"use client";

import { ErrorMessage } from "./ErrorMessage";
import { forwardRef } from "react";

interface PropsCommentInput
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMessage?: string;
  label: string;
  styles?: string;
  lableMargin?: boolean;
}
import { useState } from "react";

export const CommentInput: React.FC<PropsCommentInput> = forwardRef(
  (
    { label, errorMessage, styles, name, lableMargin = true, ...rest },
    _ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    const [height, setHeight] = useState("auto");

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
      const textarea = event.target as HTMLTextAreaElement;
      setHeight("auto");
      setHeight(`${textarea.scrollHeight}px`);
    };

    return (
      <div className="relative w-full">
        <label
          htmlFor={name}
          className={`${lableMargin ? "block mb-[4px]" : ""}`}
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
          style={{ height }}
          onInput={handleInput}
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
