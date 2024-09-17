"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// Components
import Button from "@/components/Button/Button";
import compareAnswers from "./compareAnswers";
// Types
import { QuestionsState } from "@/types/quiz";
// Hooks
import useWindowSize from "@/app/hook/useWindowSize";

type Props = {
  questions: QuestionsState;
  totalQuestions: number;
};

const grid = 8;

const getItemStyle = (isDragging:any, draggableStyle:any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  
  // change background colour if dragging
  background: isDragging ? "rgb(34 211 238)" : "rgb(8 145 178)",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "rgb(248 250 252)" : "rgb(248 250 252)",
  padding: grid,
  width: 250
});

const Quiz = ({ questions, totalQuestions }: Props) => {
  const [kolb, setKolb] = useState('');
  const [currentIndex, setCurrentIndex] = useState(1);
  const [options, setOptions] = useState(questions[0].answers);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [finish, setFinish] = useState(false);
  const size = useWindowSize();
  const router = useRouter();

  const update = async (type:string) => {
    try {
      const res = await fetch('/api/user/kolb', {
        method: 'POST',
        body: JSON.stringify({
          kolb
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch (error: any) {
      console.log(error)
    }
  }
  const handleChangeQuestion = (step: number) => {
    const newIndex = currentIndex + step;
    if (newIndex <= 0 || newIndex > totalQuestions) return;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: options }));
    setCurrentIndex(newIndex);
    setOptions(questions[newIndex-1].answers)
    console.log(questions);
    console.log(userAnswers);
  };

  const handleEndQuiz = () => {
    setUserAnswers(prev => {
      // Update state based on previous state
      const newUserAnswers = {...prev, [currentIndex]: options};
  
      // Now newUserAnswers should hold the updated state
      const userScores = compareAnswers(newUserAnswers, questions);
  
      // You can now use userScores here
      console.log(userScores)
      if(userScores.scoreC - userScores.scoreA > 7) {
        if(userScores.scoreD - userScores.scoreB > 6) {
          setKolb('收斂型')
        } else {
          setKolb('同化型')
        }
      } else {
        if(userScores.scoreD - userScores.scoreB > 6) {
          setKolb('調適型')
        } else {
          setKolb('分散型')
        }
      }
      console.log(kolb);
      return newUserAnswers;
    });
    setFinish(true);
  }

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;
    const optionsArray = Array.from(options);
    const [reorderedOption] = optionsArray.splice(result.source.index, 1);
    optionsArray.splice(result.destination.index, 0, reorderedOption);
    setOptions(optionsArray);
    console.log(kolb);
  }
  
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
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <p className="text-gray-400">選項拖曳區</p>
                <div className="flex justify-center">
                <Droppable droppableId="items">
                  {(provided, snapshot) => (
                    <ul {...provided.droppableProps} 
                      ref={provided.innerRef} 
                      style={getListStyle(snapshot.isDraggingOver)}
                      className="rounded-lg justify-center "
                    >
                      {options.map((option, index) => (
                        <Draggable key={option} draggableId={option} index={index} >
                          {(provided, snapshot) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className={snapshot.isDragging ? 
                                "shadow-lg rounded-full m-4 text-slate-200" 
                                : "shadow-lg rounded-full m-4 text-slate-200"}
                            >
                              {option}
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
                </div>
              </DragDropContext>
            </div>
            </div>
            <div className="flex justify-center gap-6 pb-10">
              {!finish && <Button text="上一題" onClick={() => handleChangeQuestion(-1)} />}
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
                  router.push('/dashboard')
                }} />}
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
                router.push('/dashboard')
              }} />}
          </div>
        </div>
      </div>
    </div>
  );

};

export default Quiz;
