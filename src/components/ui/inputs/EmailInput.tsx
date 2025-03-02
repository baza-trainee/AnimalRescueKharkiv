import { FC, ForwardedRef, forwardRef } from "react";
// import { ErrorMessage } from "./ErrorMessage";

interface PropsEmailInput extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string;
  label: string;
}

export const EmailInput: FC<PropsEmailInput> = forwardRef(
  ({ errorMessage, label, name, ...rest }, _ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div className="relative w-full">
        <label htmlFor={name} className="block mb-2 text-[18px] font-medium">
          {label}
        </label>
        <input
          {...rest}
          type="email"
          id={name}
          ref={_ref}
          className={`w-full px-3 py-2 mb-4 rounded-xl bg-transparent  placeholder-crm-secondary-blue border ${
            errorMessage
              ? "border-red-600 placeholder:text-red-600 outline-red-600"
              : "border-gray-300 outline-crm-secondary-blue"
          } transition duration-300 text-[14px]`}
        />
        {/* {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} */}
      </div>
    );
  }
);
export default EmailInput;
