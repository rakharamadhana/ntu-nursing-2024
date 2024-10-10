"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
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
  width: 250,
});

const Quiz = ({ questions, totalQuestions }: Props) => {
  const [kolb, setKolb] = useState('');
  const [currentIndex, setCurrentIndex] = useState(1);
  const [options, setOptions] = useState(questions[0].answers);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [finish, setFinish] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const size = useWindowSize();
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  const update = async (type: string) => {
    try {
      const res = await fetch('/api/user/kolb', {
        method: 'POST',
        body: JSON.stringify({ kolb }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
    } catch (error: any) {
      console.error("Error updating data:", error);
    }
  };

  const handleChangeQuestion = (step: number) => {
    const newIndex = currentIndex + step;
    if (newIndex <= 0 || newIndex > totalQuestions) return;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: options }));
    setCurrentIndex(newIndex);
    setOptions(questions[newIndex - 1].answers);
  };

  const handleEndQuiz = () => {
    setUserAnswers(prev => {
      const newUserAnswers = { ...prev, [currentIndex]: options };
      const userScores = compareAnswers(newUserAnswers, questions);
      if (userScores.scoreC - userScores.scoreA > 7) {
        if (userScores.scoreD - userScores.scoreB > 6) {
          setKolb('收斂型');
        } else {
          setKolb('同化型');
        }
      } else {
        if (userScores.scoreD - userScores.scoreB > 6) {
          setKolb('調適型');
        } else {
          setKolb('分散型');
        }
      }
      return newUserAnswers;
    });
    setFinish(true);
  }

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

  const sizeWidthNow =
      size.width > 1024 ? (size.height > 1000 ? "pt-40" : "") : "";

  if (!finish) {
    return (
        <div className=" text-black text-center justify-center sm:px-10 ">
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
                  <Image src="/down.png" alt="down" width={100} height={100}></Image>
                  <p>最不像</p>
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <p className="text-gray-400">選項拖曳區</p>
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
                              className={`shadow-lg rounded-full m-4 text-slate-200 p-4 ${isDragging ? 'picked-up' : ''}`}
                          >
                            {option}
                          </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 pb-10">
                {!finish && <Button text="上一題" onClick={() => handleChangeQuestion(-1)}/>}
                {!finish && <Button
                    text={currentIndex === totalQuestions ? "結束" : "下一題"}
                    onClick={
                      currentIndex === totalQuestions
                          ? () => {
                            handleEndQuiz();
                          }
                          : () => handleChangeQuestion(1)
                    }
                />}
                {finish && <Button text="上傳資料"
                                   onClick={() => {
                                     update(kolb);
                                     router.push('/dashboard');
                                   }}/>}
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className=" text-black text-center justify-center sm:px-10 ">
        <div className={sizeWidthNow}>
          <div className="rounded-lg bg-slate-100 px-10 gap-5 sm:shadow-lg flex flex-col justify-center">
            <p className="text-black font-bold text-[16px] py-10">
              測試結果為：{kolb}
            </p>
            <div className="flex justify-center gap-6 pb-10">
              {finish && <Button text="上傳資料"
                                 onClick={() => {
                                   update(kolb);
                                   router.push('/dashboard');
                                 }} />}
            </div>
          </div>
        </div>
      </div>
  );
};

export default Quiz;
