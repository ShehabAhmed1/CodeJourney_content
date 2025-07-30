import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Code } from "lucide-react";
import { Menu, X } from "lucide-react";
import Sidebar from "./assets/Components/Sidebar";
import ButtonUp from "./assets/Components/ButttonUp";
import "./App.css";
import Data from "./assets/Data.json";

const App = () => {
  const [lec, setLec] = useState(Data["lec2"]);
  const [currentSlideNum, setCurrentSlideNum] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(lec[0]);
  const [showsider, setShowSider] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && currentSlideNum > 0) {
        setCurrentSlideNum(currentSlideNum - 1);
        setCurrentSlide(lec[currentSlideNum - 1]);
      } else if (e.key === "ArrowRight" && currentSlideNum < lec.length - 1) {
        setCurrentSlideNum(currentSlideNum + 1);
        setCurrentSlide(lec[currentSlideNum + 1]);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentSlideNum, lec.length]);

  const nextSlide = () => {
    if (currentSlideNum < lec.length - 1) {
      setCurrentSlideNum(currentSlideNum + 1);
      setCurrentSlide(lec[currentSlideNum + 1]);
    }
  };

  const prevSlide = () => {
    if (currentSlideNum > 0) {
      setCurrentSlideNum(currentSlideNum - 1);
      setCurrentSlide(lec[currentSlideNum - 1]);
    }
  };

  return (
    <section className="App bg-gray-900 min-h-screen pb-10">
      <div className="fixed top-2 left-1 text-gray-100 bg-gray-900 p-1 rounded-full md:hidden">
        {showsider ? (
          <X onClick={() => setShowSider(false)} />
        ) : (
          <Menu onClick={() => setShowSider(true)} />
        )}
      </div>
      {/* Header */}
      <Header
        lec={lec}
        setCurrentSlide={setCurrentSlide}
        currentSlideNum={currentSlideNum}
      />
      <div className="main-container">
        <div className="session-content flex gap-4 py-10 ">
          <div className="w-4/3">
            {/* Navigation */}
            <Navigate
              lec={lec}
              setCurrentSlideNum={setCurrentSlideNum}
              prevSlide={prevSlide}
              nextSlide={nextSlide}
            />
            {/* Main Slide Content */}
            <SlideLayout
              title={currentSlide.title}
              subtitle={currentSlide.subtitle}
              explanation={currentSlide.explanation}
              code={currentSlide.code}
              output={currentSlide.output}
              notes={currentSlide.notes}
              question={currentSlide.question}
            />
          </div>
          <Sidebar
            allLec={Data}
            setLec={setLec}
            setCurrentSlide={setCurrentSlide}
            setCurrentSlideNum={setCurrentSlideNum}
            showSidebar={showsider}
          />
          <ButtonUp />
        </div>
      </div>
    </section>
  );
};

const Header = ({ currentSlideNum, lec, setCurrentSlide }) => {
  return (
    <div className="bg-gray-900 shadow-sm border-b border-gray-200 px-6 py-4 flex items-center flex-col md:flex-row gap-8 justify-between">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-500 p-2 rounded-lg">
          <Code className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-200 ">Python Tutorial</h1>
          <p className="text-sm text-gray-500">
            Interactive Learning Presentation
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-200 ">CodeJourney </h1>
          {/* <p className="text-sm text-gray-500">Eng.Shehab Ahmed </p> */}
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          Slide {currentSlideNum + 1} of {lec.length}
        </div>
        <div className="flex space-x-1">
          {lec.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlideNum ? "bg-blue-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Navigate = ({ nextSlide, prevSlide, lec, currentSlideNum }) => {
  return (
    <div className=" px-4 py-8 mb-4 bg-gray-900">
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <button
          onClick={prevSlide}
          disabled={currentSlideNum === 0}
          className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-colors ${
            currentSlideNum === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-center hidden md:block">
          <div className="text-sm text-gray-500 mb-1">
            Use arrow keys to navigate
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <kbd className="px-2 py-1 bg-gray-100 rounded">←</kbd>
            <span>Previous</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded">→</kbd>
            <span>Next</span>
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlideNum === lec.length - 1}
          className={`flex items-center space-x-2 px-4 py-2  cursor-pointer  rounded-lg transition-colors ${
            currentSlideNum === lec.length - 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const SlideLayout = ({
  title,
  subtitle,
  explanation,
  code,
  output,
  notes,
  question,
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col rounded-2xl ">
      <div className="p-6 space-y-6 text-right " dir="rtl">
        {/* Title & Subtitle */}
        <div>
          <h1 className="text-2xl font-bold text-center text-gray-800">
            {title}
          </h1>
          <p className="text-md text-gray-500 text-center">{subtitle}</p>
        </div>

        {/* Explanation */}
        <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
          {explanation}
        </div>

        {/* Code Example */}
        {code && (
          <div dir="ltr">
            <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm whitespace-pre-wrap text-left leading-loose">
              <div className="text-gray-400 mb-2"># مثال على الكود</div>
              {code}
            </div>
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm text-blue-800 whitespace-pre-line">
            <strong>نتيجة الكود:</strong>
            <div className="bg-gray-900 text-gray-200 text-left p-4 border-2 rounded-lg">
              {output}
            </div>
          </div>
        )}

        {/* Notes */}
        {notes && (
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <div className="text-yellow-800 font-semibold mb-2">💡 مهم:</div>
            <div className="text-yellow-700">{notes}</div>
          </div>
        )}

        {/* Question */}
        {question && (
          <div className=" p-4 rounded-md space-y-4 border-2 border-green-300">
            <pre className="font-semibold text-gray-800">{question.text}</pre>
            <ul className="space-y-2">
              {question.options.map((option, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span>{option}</span>
                </li>
              ))}
            </ul>
            <div className="text-sm text-green-600 mt-2">
              ✅ الإجابة الصحيحة: <strong>{question.correct}</strong>
            </div>
            {question.explanation && (
              <div className="text-xs text-gray-500 mt-1">
                ملاحظة: {question.explanation}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
