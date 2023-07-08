export type Question = {
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
};

export type QuestionsState = Array<Question & { answers: Array<string> }>;
