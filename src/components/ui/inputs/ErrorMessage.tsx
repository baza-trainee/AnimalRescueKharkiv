export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="bottom-[0px] text-[#B00000] text-[18px] font-medium">
      {children}
    </p>
  );
};
