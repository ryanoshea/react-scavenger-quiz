import { QUESTIONS } from '../data/QuizData';

export class State {
    public constructor(
        public questionIdx = 0,
        public answer = '',
        public prevSubmitIncorrect = false
    ) { }
}

export const INITIAL_STATE = new State();

export const ACTIONS = {
    UPDATE_ANSWER: 'updateAnswer',
    SUBMIT_ANSWER: 'submitAnswer'
}

export type DISPATCH_TYPE = {
    type: string,
    payload?: any
};

export type REDUCER_TYPE = (
    state: State,
    action: DISPATCH_TYPE
) => State;

export const REDUCER: REDUCER_TYPE = (state, action) => {
    const newState = { ...state } as State;
    const question = QUESTIONS[state.questionIdx];

    switch (action.type) {
        case ACTIONS.UPDATE_ANSWER:
            newState.answer = action.payload;
            newState.prevSubmitIncorrect = false;
            break;
        case ACTIONS.SUBMIT_ANSWER:
            if (question.checkAnswer(state.answer)) {
                newState.questionIdx++;
                newState.prevSubmitIncorrect = false;
                newState.answer = '';
            } else {
                newState.prevSubmitIncorrect = true;
            }
            break;
    }

    return newState;
};
