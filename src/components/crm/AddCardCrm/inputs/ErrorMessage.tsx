export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className=" w-max absolute bottom-[-24px] text-[#B00000] text-[14px] md:text-[18px] leading-[27px] font-medium">
      {children}
    </p>
  );
};
