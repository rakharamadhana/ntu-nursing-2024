export default function compareAnswers (userAnswers: any, questions: any) {
    let scoreA = 0;
    let scoreB = 0;
    let scoreC = 0;
    let scoreD = 0;

    for (let i = 0; i < questions.length; i++) {
        let option = {answerA: questions[i].answerA, answerB: questions[i].answerB, answerC: questions[i].answerC, answerD: questions[i].answerD}

        for(let j = 0; j < 4; j++) {
            if(userAnswers[i+1][j] === option.answerA) scoreA += (4 - j);
            if(userAnswers[i+1][j] === option.answerB) scoreB += (4 - j);
            if(userAnswers[i+1][j] === option.answerC) scoreC += (4 - j);
            if(userAnswers[i+1][j] === option.answerD) scoreD += (4 - j);
        }
    }

    return {scoreA, scoreB, scoreC, scoreD};
}