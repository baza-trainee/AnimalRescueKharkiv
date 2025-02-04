// "use client";
// const LatesrAdd = () => {
//   return (
//     <>
//       <div className="mx-5 px-5 py-2 w-[342px] border-[1px] border-solid border-mainBlue rounded-[10px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)] overflow-x-auto">
//         <h3 className="font-semibold text-2xl mb-4">Останні поповнення:</h3>
//         <div className="flex gap-x-4 overflow-x-auto scroll-my-4 pb-3">
//           <div className="flex-[0_0_163px]  shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
//             <img
//               src="/assets/imagescrm/сat.png"
//               className="w-full h-40"
//               alt="cat"
//             />
//             <div className="p-1">
//               <p className="text-xl --font-inter">Кузя</p>
//               <p className="text-color-Id">ID414141</p>
//               <p className="">Вовчанск</p>
//               <p className="">13.06</p>
//             </div>
//           </div>
//           <div className="flex-[0_0_163px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
//             <img
//               src="/assets/imagescrm/сat.png"
//               className="w-full h-40"
//               alt="cat"
//             />
//             <div className="p-1">
//               <p className="text-xl --font-inter">Кузя</p>
//               <p className="text-color-Id">ID414141</p>
//               <p className="">Вовчанск</p>
//               <p className="">13.06</p>
//             </div>
//           </div>
//           <div className="flex-[0_0_163px] shadow-[4px_4px_10px_rgba(182,187,235,0.3),-4px_-4px_10px_rgba(182,187,235,0.3)]">
//             <img
//               src="/assets/imagescrm/сat.png"
//               className="w-full h-40"
//               alt="cat"
//             />
//             <div className="p-1">
//               <p className="text-xl --font-inter">Кузя</p>
//               <p className="text-color-Id">ID414141</p>
//               <p className="">Вовчанск</p>
//               <p className="">13.06</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default LatesrAdd;
import { useRef, useState } from "react";

export default function SwipeSlider() {
  const slides = [
    { img: "https://via.placeholder.com/300", text: "Slide 1" },
    { img: "https://via.placeholder.com/300", text: "Slide 2" },
    { img: "https://via.placeholder.com/300", text: "Slide 3" },
    { img: "https://via.placeholder.com/300", text: "Slide 4" }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 50 && currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if (endX - startX > 50 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full max-w-md overflow-hidden mx-auto">
      <div
        ref={sliderRef}
        className="flex transition-transform duration-300"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full flex flex-col items-center justify-center h-60 bg-gray-300">
            <img src={slide.img} alt={slide.text} className="w-48 h-32 object-cover" />
            <p className="mt-2 text-lg font-semibold">{slide.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
