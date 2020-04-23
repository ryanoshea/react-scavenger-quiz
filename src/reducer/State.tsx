import { QUESTIONS } from '../data/QuizData';

export class State {
    public constructor(
        public questionIdx = 0,
        public answer = '',
        public prevSubmitIncorrect = false,
        public hidingWrongAnswerAlert = false,
        public fadeQuestionIn = false
    ) {}
}

export const INITIAL_STATE = new State();

export const ACTIONS = {
    UPDATE_ANSWER: 'updateAnswer',
    SUBMIT_ANSWER: 'submitAnswer',
    FINISH_HIDING_WRONG_ANSWER_ALERT: 'finishHidingWrongAnswerAlert',
    GO_PREV_QUESTION: 'goPrevQuestion',
    START_QUIZ: 'startQuiz',
};

export type DISPATCH_TYPE = {
    type: string;
    payload?: any;
};

export type REDUCER_TYPE = (state: State, action: DISPATCH_TYPE) => State;

export const REDUCER: REDUCER_TYPE = (state, action) => {
    const newState = { ...state } as State;
    const question = QUESTIONS[state.questionIdx];

    switch (action.type) {
        case ACTIONS.START_QUIZ:
            newState.questionIdx = 1;
            newState.answer = '';
            newState.prevSubmitIncorrect = false;
            break;
        case ACTIONS.UPDATE_ANSWER:
            newState.answer = action.payload;
            newState.prevSubmitIncorrect = false;
            newState.hidingWrongAnswerAlert = state.prevSubmitIncorrect;
            break;
        case ACTIONS.FINISH_HIDING_WRONG_ANSWER_ALERT:
            newState.hidingWrongAnswerAlert = false;
            break;
        case ACTIONS.GO_PREV_QUESTION:
            if (state.questionIdx > 0) {
                newState.answer = '';
                newState.questionIdx--;
                newState.prevSubmitIncorrect = false;
            }
            break;
        case ACTIONS.SUBMIT_ANSWER:
            if (question.checkAnswer(state.answer)) {
                newState.questionIdx++;
                newState.prevSubmitIncorrect = false;
                newState.answer = '';
                newState.fadeQuestionIn = false;
            } else {
                newState.prevSubmitIncorrect = true;
            }
            break;
    }

    return newState;
};
