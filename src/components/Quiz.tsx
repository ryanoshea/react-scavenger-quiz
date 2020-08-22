import React, { useReducer, useEffect, useState } from 'react';
import { REDUCER, INITIAL_STATE } from '../reducer/State';
import { QUESTIONS } from '../data/QuizData';
import QuestionRenderer from './QuestionRenderer';
import './Quiz.scss';
import Emoji from './Emoji';
import { useCookies } from 'react-cookie';
import { STORED_PROGRESS_COOKIE } from '../Consts';
import classNames from 'classnames';

const Quiz = () => {
    const loadStoredProgress = (cookies: any) => {
        const val = cookies[STORED_PROGRESS_COOKIE];
        if (val != null) {
            return parseInt(val, 10);
        } else {
            return null;
        }
    };

    const [cookies, setCookie] = useCookies([STORED_PROGRESS_COOKIE]);
    const storedProgress = loadStoredProgress(cookies);
    const initialState = storedProgress != null ? { ...INITIAL_STATE, questionIdx: storedProgress } : INITIAL_STATE;
    const [state, dispatch] = useReducer(REDUCER, initialState);
    const { questionIdx } = state;
    const question = QUESTIONS[questionIdx];
    const emoji = <Emoji char='🎉' desc='celebration' />;
    const [isHeaderReflected, setIsHeaderReflected] = useState(false);

    useEffect(() => {
        setCookie(STORED_PROGRESS_COOKIE, questionIdx);
    }, [questionIdx, setCookie]);

    useEffect(() => {
        const interval = setInterval(() => setIsHeaderReflected((cur: boolean) => !cur), 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='quiz'>
            <header className={classNames({ reflect: isHeaderReflected })}>
                <h1>
                    {emoji}
                    <img src='./images/animoji.png' alt='animoji' />
                    {emoji}
                </h1>
            </header>
            <div className='row justify-content-center'>
                <div className='col-11 col-md-8 col-lg-6'>
                    <QuestionRenderer model={question} state={state} dispatch={dispatch} />
                </div>
            </div>
        </div>
    );
};

export default Quiz;
