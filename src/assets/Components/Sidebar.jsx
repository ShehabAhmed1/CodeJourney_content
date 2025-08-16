import { useState } from "react";
export default function Sidebar({
  allLec,
  setLec,
  setCurrentSlide,
  setCurrentSlideNum,
  showSidebar,
}) {
  const [active, setActive] = useState("lec1");
  return (
    <aside
      className={`border-2 border-r-0 md:border-r-2 rounded-tl-xl rounded-bl-xl md:rounded-r-xl border-gray-500  bg-gray-900 shadow-sm p-6 w-3/4 md:w-1/4  transition-all duration-300 ease-in-out ${
        showSidebar ? "right-0" : "-right-full"
      } fixed md:relative md:right-0 top-0  h-screen  md:h-auto z-50`}
    >
      <ul>
        {Object.keys(allLec).map((q) => {
          return (
            <li
              id={q}
              className={`border-2 cursor-pointer hover:scale-120 transition-all duration-500  bg-gray-200 rounded-lg p-2 text-center mb-4 text-gray-800
                 ${active === q ? "border-green-400 scale-120" : ""}`}
              key={q}
              onClick={() => {
                setLec(allLec[q]);
                setCurrentSlide(allLec[q][0]);
                setCurrentSlideNum(0);
                setActive(q);
              }}
            >
              {q}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
