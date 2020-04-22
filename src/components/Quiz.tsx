import React, { useReducer } from 'react';
import { REDUCER, INITIAL_STATE } from '../reducer/State';
import { QUESTIONS } from '../data/QuizData';
import QuestionRenderer from './QuestionRenderer';
import './Quiz.scss';
import Emoji from './Emoji';

const Quiz = () => {
    const [state, dispatch] = useReducer(REDUCER, INITIAL_STATE);
    const question = QUESTIONS[state.questionIdx];
    const emoji = <Emoji char='🎉' desc='celebration' />;

    return <div className='quiz'>
        <header>
            <h1>
                {emoji}
                <img src='./images/animoji.png' alt='tess'/>
                {emoji}
            </h1>
        </header>
        <div className='row justify-content-center'>
            <div className='col-11 col-md-8 col-lg-6'>
                <QuestionRenderer
                    model={question}
                    state={state}
                    dispatch={dispatch}
                />
            </div>
        </div>
    </div>;
}

export default Quiz;
