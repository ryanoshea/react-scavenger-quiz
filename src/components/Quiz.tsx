import React, { useReducer } from 'react';
import { REDUCER, INITIAL_STATE } from '../reducer/State';
import { QUESTIONS } from '../data/QuizData';
import QuestionRenderer from './QuestionRenderer';

const Quiz = () => {
    const [state, dispatch] = useReducer(REDUCER, INITIAL_STATE);
    const question = QUESTIONS[state.questionIdx];

    return <div className='quiz'>
        <QuestionRenderer
            model={question}
            state={state}
            dispatch={dispatch}
        />
    </div>;
}

export default Quiz;
