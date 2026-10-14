import type {ScoredQuestion,AnswerFeedback} from './data';
export function answerFeedback(question:ScoredQuestion,answer:number):AnswerFeedback{
 return {status:answer===-1?'skipped':answer===question.correct?'correct':'wrong',correctAnswer:question.options[question.correct],answer};
}
