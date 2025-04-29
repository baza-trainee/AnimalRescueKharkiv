export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className=" text-crm-warning-red text-[18px] font-medium break-words leading-[27px] max-w-[342px] w-full ">
      {children}
    </p>
  );
};
