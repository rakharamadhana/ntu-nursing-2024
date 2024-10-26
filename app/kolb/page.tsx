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
        answerA: 'A. 我比較重視自己的感覺',
        answerB: 'B. 我喜歡思考',
        answerC: 'C. 我喜歡實際動手做',
        answerD: 'D. 我喜歡觀察與聆聽'
      }, 
      {
        question: '我利用何種方式可以學得更好：',
        answerA: 'A. 觀察',
        answerB: 'B. 人際互動',
        answerC: 'C. 邏輯推理',
        answerD: 'D. 實作與練習'
      },
      {
        question: '我學習最好的情況是：',
        answerA: 'A. 當我仔細聆聽與觀察時',
        answerB: 'B. 當我著重邏輯思考時',
        answerC: 'C. 當我相信自己的直覺與感受時',
        answerD: 'D. 當我努力的把事情做完時'
      },
      {
        question: '當我學習時：',
        answerA: 'A. 我喜歡看到實作的成果',
        answerB: 'B. 我喜歡觀念及理論',
        answerC: 'C. 我在行動之前會先停下來想一想',
        answerD: 'D. 我感覺全心全意投入學習中'
      },
      {
        question: '當我在學習時：',
        answerA: 'A. 我傾向使用推理思考的方法',
        answerB: 'B. 我對事情負責',
        answerC: 'C. 我比較謹慎、保守',
        answerD: 'D. 我有強烈的感覺及反應'
      },
      {
        question: '在什麼情況下，我學習的最好：',
        answerA: 'A. 當我依據觀察時',
        answerB: 'B. 當我依據感覺時',
        answerC: 'C. 當我自己動手做時',
        answerD: 'D. 當我相信自己的想法時'
      },
      {
        question: '我學習主要是依：',
        answerA: 'A. 感覺',
        answerB: 'B. 實作',
        answerC: 'C. 觀察',
        answerD: 'D. 思考'
      },
      {
        question: '當我在學習時：',
        answerA: 'A. 我常持保留態度',
        answerB: 'B. 我很容易接受別人的意見',
        answerC: 'C. 我是有責任感的人',
        answerD: 'D. 我是理智的人'
      },
      {
        question: '當我學習時：',
        answerA: 'A. 我能接受新的經驗',
        answerB: 'B. 我會從各個層面思考問題',
        answerC: 'C. 我喜歡分析問題，並將其分成幾個部分進行探討',
        answerD: 'D. 我喜歡嘗試實際動手做'
      },
      {
        question: '當我學習時：',
        answerA: 'A. 我很投入',
        answerB: 'B. 我喜歡觀察',
        answerC: 'C. 我會評估事務',
        answerD: 'D. 我喜歡付諸行動'
      },
      {
        question: '當我在學習時：',
        answerA: 'A. 我是觀察型的人',
        answerB: 'B. 我是行動型的人',
        answerC: 'C. 我是直覺型的人',
        answerD: 'D. 我是邏輯型的人'
      },
      {
        question: '在什麼情況下，我學習最好：',
        answerA: 'A. 當我分析思考時',
        answerB: 'B. 當我敞開心胸接受別人想法時',
        answerC: 'C. 當我小心謹慎時',
        answerD: 'D. 當我實際操作時'
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
