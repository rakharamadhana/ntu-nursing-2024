"use client";

import React from "react";
import { useRouter } from "next/navigation";
// Components
import QuestionCard from "@/components/QuestionCard/QuestionCard";
import Button from "@/components/Button/Button";
// Types
import { QuestionsState } from "@/types/quiz";

import useWindowSize from "@/app/hook/useWindowSize";

type Props = {
  questions: QuestionsState;
  totalQuestions: number;
};

const Quiz = ({ questions, totalQuestions }: Props) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [order, setOrder] = React.useState([""]);
  const [userAnswers, setUserAnswers] = React.useState<
    Record<number, string[]>
  >({});
  const size = useWindowSize();

  const isQuestionAnswered = userAnswers[currentIndex] ? true : false;

  const router = useRouter();

  const handleOnAnswerClick = (answer: string, currentIndex: number) => {
    if (order.map((any) => any === answer)) {
      console.log("duplicated");
    }
    // Save the answer in the object for user answers
    setOrder([...order, answer]);
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: order }));
    console.log(userAnswers);
  };

  const handleChangeQuestion = (step: number) => {
    const newIndex = currentIndex + step;
    if (newIndex < 0 || newIndex >= totalQuestions) return;
    setCurrentIndex(newIndex);
    console.log(userAnswers);
  };
  
  const sizeHeightNow = size.height > 800 ? "mt-[30vh]" : "mt-[25vh]";
  const sizeWidthNow =
    size.width > 1024 ? (size.height > 1000 ? "pt-40" : "") : "";

  return (
    <div className=" text-black text-center justify-center">
      <div className={sizeWidthNow}>
        <div className={sizeHeightNow}>
          <p className="p-8 font-bold text-[20px]">得分: {score}</p>
          <p className="text-black font-bold text-[16px] ">
            當前第 {currentIndex + 1} 題 共 {totalQuestions} 題
          </p>
          <QuestionCard
            currentQuestionIndex={currentIndex}
            question={questions[currentIndex].question}
            answers={questions[currentIndex].answers}
            onClick={handleOnAnswerClick}
          />
          <div className="flex justify-between mt-5 gap-6">
            <Button text="上一題" onClick={() => handleChangeQuestion(-1)} />
            <Button
              text={currentIndex === totalQuestions - 1 ? "結束" : "下一題"}
              onClick={
                currentIndex === totalQuestions - 1
                  ? () => router.push(`/finish/${score}`)
                  : () => handleChangeQuestion(1)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
