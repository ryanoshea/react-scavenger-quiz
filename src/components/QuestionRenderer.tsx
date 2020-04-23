import React, { useRef, useEffect } from 'react';
import { Question, QUESTIONS } from '../data/QuizData';
import { DISPATCH_TYPE, ACTIONS, State } from '../reducer/State';
import classNames from 'classnames';
import './QuestionRenderer.scss';
import Progress from './Progress';
import StartButton from './StartButton';

const QuestionRenderer = (props: { model: Question; state: State; dispatch: React.Dispatch<DISPATCH_TYPE> }) => {
    const {
        model,
        state: { answer, prevSubmitIncorrect, questionIdx, hidingWrongAnswerAlert },
        dispatch,
    } = props;

    const ANIMATION_DELAY = 200;

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isFirstQuestion = () => questionIdx === 0;
        const timeout = setTimeout(
            () => {
                if (!container.current?.classList.contains('active')) {
                    container.current?.classList.add('active');
                }
            },
            isFirstQuestion() ? 0 : ANIMATION_DELAY
        );

        return () => clearTimeout(timeout);
    }, [questionIdx]);

    useEffect(() => {
        if (hidingWrongAnswerAlert) {
            const timeout = setTimeout(
                () =>
                    dispatch({
                        type: ACTIONS.FINISH_HIDING_WRONG_ANSWER_ALERT,
                    }),
                ANIMATION_DELAY
            );
            return () => clearTimeout(timeout);
        }
    }, [hidingWrongAnswerAlert, dispatch]);

    const submit = (action: string) => {
        if (action !== ACTIONS.SUBMIT_ANSWER || model.checkAnswer(answer)) {
            container.current?.classList.remove('active');
            setTimeout(
                () =>
                    dispatch({
                        type: action,
                    }),
                ANIMATION_DELAY
            );
        } else {
            dispatch({
                type: ACTIONS.SUBMIT_ANSWER,
            });
        }
    };

    return (
        <div className={classNames('question')} ref={container}>
            <div className='question-body'>
                {model.prompts.map((prompt, i) => (
                    <p key={i} className='prompt'>
                        {prompt}
                    </p>
                ))}
                {(model.hasAnswers || questionIdx === 0) && (
                    <form
                        onSubmit={e => {
                            e.preventDefault();
                        }}
                    >
                        <div className='form-group'>
                            {questionIdx > 0 ? (
                                <div className='input-group mb-3 answer-box'>
                                    <input
                                        type='text'
                                        value={answer}
                                        onChange={e =>
                                            dispatch({
                                                type: ACTIONS.UPDATE_ANSWER,
                                                payload: e.target.value,
                                            })
                                        }
                                        className='form-control'
                                        placeholder={'Type the answer'}
                                        autoFocus
                                    />
                                    <div className='input-group-append'>
                                        <button
                                            className='btn btn-primary'
                                            onClick={() => submit(ACTIONS.SUBMIT_ANSWER)}
                                            type='submit'
                                        >
                                            Answer
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Show a start button for the first question
                                <div className='input-group start-button'>
                                    <StartButton onClick={() => submit(ACTIONS.START_QUIZ)} />
                                </div>
                            )}
                        </div>
                        {(prevSubmitIncorrect || hidingWrongAnswerAlert) && (
                            <div
                                className={classNames('alert alert-danger', {
                                    removing: hidingWrongAnswerAlert,
                                })}
                                role='alert'
                            >
                                Try again.
                            </div>
                        )}
                    </form>
                )}
            </div>
            {questionIdx > 0 && (
                <div className='row'>
                    <div className='col-4'>
                        <button className='btn btn-link back-button' onClick={() => submit(ACTIONS.GO_PREV_QUESTION)}>
                            ← Back
                        </button>
                    </div>
                    <div className='col-8 progress-col'>
                        <Progress current={questionIdx} total={QUESTIONS.length - 1} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionRenderer;
