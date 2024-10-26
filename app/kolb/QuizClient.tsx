"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button/Button";
import compareAnswers from "./compareAnswers";
import { QuestionsState } from "@/types/quiz";
import useWindowSize from "@/app/hook/useWindowSize";

type Props = {
  questions: QuestionsState;
  totalQuestions: number;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any, isDraggingOver: boolean) => ({
  userSelect: "none",
  padding: grid * 2,
  background: isDragging ? "rgb(34 211 238)" : isDraggingOver ? "rgba(34, 211, 238, 0.5)" : "rgb(8 145 178)",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "rgb(248 250 252)" : "rgb(248 250 252)",
  padding: grid,
  width: 300,
});

const Quiz = ({ questions, totalQuestions }: Props) => {
  const [kolb, setKolb] = useState("");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [options, setOptions] = useState(questions[0].answers);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [finish, setFinish] = useState(false);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null); // Specify type for TypeScript
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const size = useWindowSize();
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [userScores, setUserScores] = useState({ scoreA: 0, scoreB: 0, scoreC: 0, scoreD: 0 });

  const update = async (type: string) => {
    try {
      await fetch("/api/user/kolb", {
        method: "POST",
        body: JSON.stringify({ kolb }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      console.error("Error updating data:", error);
    }
  };

  const handleChangeQuestion = (step: number) => {
    const newIndex = currentIndex + step;

    // Debugging: Log the current index and the new index
    console.log("Current Index:", currentIndex);
    console.log("New Index:", newIndex);

    if (newIndex <= 0 || newIndex > totalQuestions) {
      // Debugging: Log if the new index is out of bounds
      console.log("Index out of bounds. Returning without changing question.");
      return;
    }

    // Save the current options to user answers
    setUserAnswers((prev) => {
      const updatedAnswers = { ...prev, [currentIndex]: options };
      // Debugging: Log the updated user answers
      console.log("Updated User Answers:", updatedAnswers);
      return updatedAnswers;
    });

    // Update the current index and options
    setCurrentIndex(newIndex);
    const nextOptions = questions[newIndex - 1].answers;
    setOptions(nextOptions);
  };

  const handleEndQuiz = () => {
    // Log the current index and options before updating the user answers
    console.log("Current Index:", currentIndex);
    console.log("Selected Options:", options);

    setUserAnswers((prev) => {
      const newUserAnswers = { ...prev, [currentIndex]: options };

      // Log the new user answers
      console.log("New User Answers:", newUserAnswers);

      // Calculate user scores with the final answers
      const calculatedScores = compareAnswers(newUserAnswers, questions);

      // Log the scores returned from compareAnswers
      console.log("User Scores:", calculatedScores);

      // Set the user scores state
      setUserScores(calculatedScores);

      // Determine Kolb type based on scores
      if (calculatedScores.scoreC - calculatedScores.scoreA > 7) {
        if (calculatedScores.scoreD - calculatedScores.scoreB > 6) {
          setKolb("收斂型");
          console.log("Kolb Type Set To: 收斂型");
        } else {
          setKolb("同化型");
          console.log("Kolb Type Set To: 同化型");
        }
      } else {
        if (calculatedScores.scoreD - calculatedScores.scoreB > 6) {
          setKolb("調適型");
          console.log("Kolb Type Set To: 調適型");
        } else {
          setKolb("分散型");
          console.log("Kolb Type Set To: 分散型");
        }
      }
      return newUserAnswers;
    });

    setFinish(true);
    console.log("Quiz Finished:", finish);
  };


  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleOnDragEnd = useCallback((startIndex: number, finishIndex: number) => {
    setOptions((prevOptions) => reorder({ list: prevOptions, startIndex, finishIndex }));
    setDraggedIndex(null);
    setHoveredIndex(null);
    handleDragEnd(); // Reset the dragging state
  }, []);

  const handleDragOver = (index: number) => {
    setHoveredIndex(index);
  };

  // Movement functions
  const moveItem = (fromIndex: number, toIndex: number) => {
    setOptions((prevOptions) => reorder({ list: prevOptions, startIndex: fromIndex, finishIndex: toIndex }));
    setMenuIndex(null); // Close the menu after movement
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) moveItem(index, index - 1);
  };

  const handleMoveDown = (index: number) => {
    if (index < options.length - 1) moveItem(index, index + 1);
  };

  const handleMoveToTop = (index: number) => {
    if (index > 0) moveItem(index, 0);
  };

  const handleMoveToBottom = (index: number) => {
    if (index < options.length - 1) moveItem(index, options.length - 1);
  };

  const sizeWidthNow = size.width > 1024 ? (size.height > 1000 ? "pt-40" : "") : "";

  const handleClickOutside = (event: MouseEvent) => {
    // Check if the click is outside the menu
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuIndex(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the click is outside the menu
      const target = event.target as HTMLElement; // Cast target to HTMLElement
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Add touch event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside); // Clean up touch event listener
    };
  }, []);


  if (!finish) {
    return (
        <div className="text-black text-center justify-center sm:px-10">
          <div className={sizeWidthNow}>
            <div className="rounded-lg bg-slate-100 px-10 gap-5 sm:shadow-lg flex flex-col justify-center">
              <p className="text-black font-bold text-[16px] pt-5">
                當前第 {currentIndex} 題 共 {totalQuestions} 題
              </p>
              <p className="rounded-lg text-[20px] bg-slate-50 py-5 mt-5 px-5 w-[400px] self-center">
                {questions[currentIndex - 1].question}
              </p>
              <div className="flex flex-row justify-center">
                <div className="flex flex-col justify-evenly text-gray-400">
                  <p>最像</p>
                  <Image src="/down.png" alt="down" width={100} height={100}/>
                  <p>最不像</p>
                </div>
                <div className="flex justify-center">
                  <ul style={getListStyle(false)} className="rounded-lg justify-center">
                    {options.map((option, index) => (
                        <li
                            key={option}
                            data-index={index}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragOver={(e) => {
                              e.preventDefault();
                              handleDragOver(index);
                            }}
                            onDrop={(e) => {
                              const startIndex = draggedIndex!;
                              handleOnDragEnd(startIndex, index);
                            }}
                            style={getItemStyle(false, {}, hoveredIndex === index)}
                            className={`shadow-lg rounded-full m-4 text-slate-200 p-4 flex items-center relative`}
                        >
                          <span className="flex-grow text-center">{option}</span> {/* Center the text */}
                          <div
                              className="p-2 rounded-full w-[2rem] flex text-center justify-evenly cursor-pointer transition duration-100 hover:bg-cyan-500 active:bg-cyan-700"
                              onClick={() => setMenuIndex(menuIndex === index ? null : index)}> {/* Allocate space for the icon */}
                            <FontAwesomeIcon
                                icon={faEllipsisV}
                            />
                          </div>
                          {menuIndex === index && (
                              <div
                                  ref={menuRef} // Attach the ref here
                                  className="absolute border border-cyan-500 top-0 -right-14 bg-gray-800 bg-opacity-95 rounded-xl shadow-md p-3 mt-12 flex flex-col space-y-4 z-10 transition-all ">
                                <button
                                    className={`p-2 rounded transition-transform duration-200 transform ${index === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-700 hover:scale-105 '}`}
                                    onClick={() => handleMoveToTop(index)}
                                    disabled={index === 0}
                                >移至頂部
                                </button>
                                <button
                                    className={`p-2 rounded transition-transform duration-200 transform ${index === 0 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-700 hover:scale-105 '}`}
                                    onClick={() => handleMoveUp(index)}
                                    disabled={index === 0}
                                >上移一格
                                </button>
                                <button
                                    className={`p-2 rounded transition-transform duration-200 transform ${index === options.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-700 hover:scale-105 '}`}
                                    onClick={() => handleMoveDown(index)}
                                    disabled={index === options.length - 1} // Disable if at the bottom
                                >下移一格
                                </button>
                                <button
                                    className={`p-2 rounded transition-transform duration-200 transform ${index === options.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-700 hover:scale-105 '}`}
                                    onClick={() => handleMoveToBottom(index)}
                                    disabled={index === options.length - 1} // Disable if at the bottom
                                >移至底部
                                </button>
                              </div>
                          )}
                        </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex justify-center gap-6 pb-10">
                {!finish && <Button text="上一題" onClick={() => handleChangeQuestion(-1)}/>}
                {!finish && (
                    <Button
                        text={currentIndex === totalQuestions ? "結束" : "下一題"}
                        onClick={
                          currentIndex === totalQuestions
                              ? handleEndQuiz
                              : () => handleChangeQuestion(1)
                        }
                    />
                )}
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="text-black text-center justify-center sm:px-10">
        <div className={sizeWidthNow}>
          <div className="rounded-lg bg-slate-100 px-10 gap-5 sm:shadow-lg flex flex-col justify-center">
            <p className="text-black font-bold text-[16px] py-5">測試結果為：{kolb}</p>

            {finish && (
                <div className="pb-2 text-center">
                  <ul>
                    <li>CE: {userScores.scoreA}</li>
                    <li>RO: {userScores.scoreB}</li>
                    <li>AC: {userScores.scoreC}</li>
                    <li>AE: {userScores.scoreD}</li>
                  </ul>
                  <ul>
                    <li>AC - CE: {userScores.scoreC - userScores.scoreA}</li>
                    <li>AE - RO: {userScores.scoreD - userScores.scoreB}</li>
                  </ul>
                </div>
            )}

            <div className="flex justify-center gap-6 pb-10">
              {finish && (
                  <Button
                      text="上傳資料"
                      onClick={() => {
                        update(kolb);
                        router.push("/dashboard");
                      }}
                  />
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Quiz;
