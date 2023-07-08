// Utils
import { shuffleArray } from '@/utils/arrayUtils';
// Components
import QuizClient from './QuizClient';
// Types
import { Question } from '@/types/quiz';


const getQuestions = async () => {
  const data = [
      {
        question: '當我學習時：',
        answerA: '我比較重視自己的感覺',
        answerB: '我喜歡思考',
        answerC: '我喜歡實際動手做',
        answerD: '我喜歡觀察與聆聽'
      }, 
      {
        question: '我利用何種方式可以學得更好：',
        answerA: '觀察',
        answerB: '人際互動',
        answerC: '邏輯推理',
        answerD: '實作與練習'
      },
      {
        question: '我學習最好的情況是：',
        answerA: '當我仔細聆聽與觀察時',
        answerB: '當我著重邏輯思考時',
        answerC: '當我相信自己的直覺與感受時',
        answerD: '當我努力的把事情做完時'
      },
      {
        question: '當我學習時：',
        answerA: '我喜歡看到時做的成果',
        answerB: '我喜歡觀念及理論',
        answerC: '我在行動之前會先停下來想一想',
        answerD: '我感覺全心全意投入學習中'
      },
      {
        question: '當我在學習時：',
        answerA: '我傾向使用推理思考的方法',
        answerB: '我對事情負責',
        answerC: '我比較謹慎、保守',
        answerD: '我有強烈的感覺及反應'
      },
      {
        question: '在什麼情況下，我學習的最好：',
        answerA: '當我依據觀察時',
        answerB: '當我依據感覺時',
        answerC: '當我自己動手做時',
        answerD: '當我相信自己的想法時'
      },
      {
        question: '我學習主要是依：',
        answerA: '感覺',
        answerB: '實作',
        answerC: '觀察',
        answerD: '思考'
      },
      {
        question: '當我在學習時：',
        answerA: '我常持保留態度',
        answerB: '我很容易接受別人的意見',
        answerC: '我是有責任感的人',
        answerD: '我是理智的人'
      },
      {
        question: '當我學習時：',
        answerA: '我能接受新的經驗',
        answerB: '我會從各個層面思考問題',
        answerC: '我喜歡分析問題，並將其分成幾個部分進行探討',
        answerD: '我喜歡嘗試實際動手做'
      },
      {
        question: '當我學習時：',
        answerA: '我很投入',
        answerB: '我喜歡觀察',
        answerC: '我會評估事務',
        answerD: '我喜歡付諸行動'
      },
      {
        question: '當我在學習時：',
        answerA: '我是觀察型的人',
        answerB: '我是行動型的人',
        answerC: '我是直覺型的人',
        answerD: '我是邏輯型的人'
      },
      {
        question: '在什麼情況下，我學習最好：',
        answerA: '當我分析思考時',
        answerB: '當我敞開心胸接受別人想法時',
        answerC: '當我小心謹慎時',
        answerD: '當我實際操作時'
      },
    ]

  return data.map((question: Question) => ({
    ...question,
    answers: shuffleArray([question.answerA, question.answerB, question.answerC, question.answerD])
  }));
};

const Quiz = async () => {
  const questions = await getQuestions();

  return (
    <div className='py-10 sm:py-20'><QuizClient questions={questions} totalQuestions={12} /></div>
    )
};

export default Quiz;
