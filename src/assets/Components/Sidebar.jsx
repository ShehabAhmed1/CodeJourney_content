import { useState } from "react";
export default function Sidebar({
  allLec,
  setLec,
  setCurrentSlide,
  setCurrentSlideNum,
  showSidebar,
}) {
  const [levels, setLevels] = useState(["level1", "level2"]);
  const [activeLevel, setActiveLevel] = useState("level1");
  const [activelec, setActivelec] = useState("lec1");

  return (
    <aside
      className={`border-2 border-r-0 md:border-r-2 rounded-tl-xl overflow-auto rounded-bl-xl md:rounded-r-xl border-gray-500  bg-gray-900 shadow-sm p-6 w-3/4 md:w-1/4  transition-all duration-300 ease-in-out ${
        showSidebar ? "right-0" : "-right-full"
      } fixed md:relative md:right-0 top-0  h-screen  md:h-auto z-50`}
    >
      <ul>
        {levels.map((level) => {
          return (
            <li
              id={level}
              className={`border-2  bg-gray-200 rounded-lg p-2 text-center mb-4 text-gray-800 cursor-pointer `}
              key={level}
              onClick={() => {
                setActiveLevel(level);
              }}
            >
              {level}
              <ul className={`${activeLevel === level ? "block" : "hidden"}`}>
                {Object.keys(allLec[level]).map((lec) => {
                  return (
                    <li
                      id={lec}
                      className={`border-2 cursor-pointer hover:scale-105 transition-all duration-500  bg-gray-200 rounded-lg p-2 text-center mb-4 text-gray-800
                        ${
                          activelec === lec ? "border-green-400 scale-105" : ""
                        }`}
                      key={lec}
                      onClick={() => {
                        setActivelec(lec);
                        setLec(allLec[level][lec]);
                        setCurrentSlideNum(0);
                        setCurrentSlide(allLec[level][lec][0]);
                      }}
                    >
                      {lec}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
