// import DashbordAdmin from "./dashbordAdmin";
// import { inter } from "../../../fonts";

// const HeaderCrm = ({ title}) => {
//     return (
//         // <header className="flex h-[56px] ml-0 border-b border-lightBlue xl:mr-16 xlr:mt-[32px] items-center">
//         //     <div className="pl-6 pt-5 xlr:pt-0 ">
//         //         <DashbordAdmin />
//         //     </div>
//         // </header>
//         <header className="flex h-[56px] ml-0 border-b border-lightBlue xl:mr-16 xlr:mt-[32px] items-center">
//            <h1 className="text-2xl font-bold"><p className={`${inter.className} font-bold text-2xl/[36px] text-mainBlue xl:text-3xl/[32px]`}>{title}</p></h1>
//            {/* {subtitle && <p className="text-sm">{subtitle}</p>} */}
//          </header>
//     )
// }

// export default HeaderCrm;
import React from "react";

import { inter } from "../../../fonts";

const HeaderCrm: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="flex  pl-6 pt-0 border-b border-lightBlue items-center">
      {/* <div className=" xlr:pt-0">
      </div> */}
      <h1 className={`${inter.className} font-bold text-2xl/[36px] text-mainBlue xl:text-3xl/[32px]`}>
        {title}
      </h1>
    </header>
  );
};

export default HeaderCrm;
