import { QUESTIONS } from '../data/QuizData';

export class State {
    public constructor(
        public questionIdx = 0,
        public answer = '',
        public prevSubmitIncorrect = false,
        public animations = {
            hidingWrongAnswerAlert: false,
            hidingQuestion: true,
        }
    ) {}
}

export const INITIAL_STATE = new State();

export const ACTIONS = {
    UPDATE_ANSWER: 'updateAnswer',
    SUBMIT_ANSWER: 'submitAnswer',
    GO_PREV_QUESTION: 'goPrevQuestion',
    GO_NEXT_QUESTION: 'goNextQuestion',
    START_QUIZ: 'startQuiz',
    // animations
    FINISH_HIDING_WRONG_ANSWER_ALERT: 'finishHidingWrongAnswerAlert',
    HIDE_QUESTION: 'hideQuestion',
    REVEAL_QUESTION: 'revealQuestion',
};

export type DISPATCH_TYPE = {
    type: string;
    payload?: any;
};

export type REDUCER_TYPE = (state: State, action: DISPATCH_TYPE) => State;

export const REDUCER: REDUCER_TYPE = (state, action) => {
    const newState = { ...state, animations: { ...state.animations } } as State;
    const question = QUESTIONS[state.questionIdx];

    switch (action.type) {
        case ACTIONS.START_QUIZ:
            newState.questionIdx = 1;
            newState.answer = '';
            newState.prevSubmitIncorrect = false;
            newState.animations.hidingQuestion = false;
            break;
        case ACTIONS.UPDATE_ANSWER:
            newState.answer = action.payload;
            newState.prevSubmitIncorrect = false;
            newState.animations.hidingWrongAnswerAlert = state.prevSubmitIncorrect;
            break;
        case ACTIONS.FINISH_HIDING_WRONG_ANSWER_ALERT:
            newState.animations.hidingWrongAnswerAlert = false;
            break;
        case ACTIONS.HIDE_QUESTION:
            newState.animations.hidingQuestion = true;
            break;
        case ACTIONS.REVEAL_QUESTION:
            newState.animations.hidingQuestion = false;
            break;
        case ACTIONS.GO_PREV_QUESTION:
            if (state.questionIdx > 0) {
                newState.answer = '';
                newState.questionIdx--;
                newState.prevSubmitIncorrect = false;
            }
            newState.animations.hidingQuestion = false;
            break;
        case ACTIONS.GO_NEXT_QUESTION:
            if (state.questionIdx < QUESTIONS.length - 1) {
                newState.answer = '';
                newState.questionIdx++;
                newState.prevSubmitIncorrect = false;
            }
            newState.animations.hidingQuestion = false;
            break;
        case ACTIONS.SUBMIT_ANSWER:
            if (question.checkAnswer(state.answer)) {
                newState.questionIdx++;
                newState.prevSubmitIncorrect = false;
                newState.answer = '';
            } else {
                newState.prevSubmitIncorrect = true;
            }
            newState.animations.hidingQuestion = false;
            break;
    }

    return newState;
};
