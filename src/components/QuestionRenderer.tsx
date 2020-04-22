import React, { useRef, useEffect } from 'react';
import { Question } from '../data/QuizData';
import { DISPATCH_TYPE, ACTIONS, State } from '../reducer/State';
import classNames from 'classnames';
import './QuestionRenderer.scss';

const QuestionRenderer = (props: {
    model: Question,
    state: State,
    dispatch: React.Dispatch<DISPATCH_TYPE>
}) => {
    const {
        model,
        state: { answer, prevSubmitIncorrect, questionIdx, hidingWrongAnswerAlert },
        dispatch
    } = props;

    const ANIMATION_DELAY = 200;

    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const isFirstQuestion = () => questionIdx === 0;
        const timeout = setTimeout(() => {
            if (!container.current?.classList.contains('active')) {
                container.current?.classList.add('active');
            }
        }, isFirstQuestion() ? 0 : ANIMATION_DELAY);

        return () => clearTimeout(timeout);
    }, [questionIdx]);

    useEffect(() => {
        if (hidingWrongAnswerAlert) {
            const timeout = setTimeout(() => dispatch({
                type: ACTIONS.FINISH_HIDING_WRONG_ANSWER_ALERT
            }), ANIMATION_DELAY);
            return () => clearTimeout(timeout);
        }
    }, [hidingWrongAnswerAlert, dispatch]);

    const submit = () => {
        if (model.checkAnswer(answer)) {
            container.current?.classList.remove('active');
            setTimeout(() => dispatch({
                type: ACTIONS.SUBMIT_ANSWER
            }), ANIMATION_DELAY);
        } else {
            dispatch({
                type: ACTIONS.SUBMIT_ANSWER
            });
        }
    };

    return <div
        ref={container}
        className={classNames('question')}
    >
        {model.prompts.map((prompt, i) => <p
            key={i}
            className='prompt'
        >
            {prompt}
        </p>)}
        {model.hasAnswers && <>
            <form
                onSubmit={e => {
                    e.preventDefault();
                }}
            >
                <div className='form-group'>
                    <div className='input-group mb-3'>
                        <input
                            type='text'
                            value={answer}
                            onChange={e => dispatch({
                                type: ACTIONS.UPDATE_ANSWER,
                                payload: e.target.value
                            })}
                            className='form-control'
                        />
                        <div className='input-group-append'>
                            <button
                                className='btn btn-primary'
                                onClick={submit}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
                {(prevSubmitIncorrect || hidingWrongAnswerAlert) &&
                    <div
                        className={classNames(
                            'alert alert-danger',
                            {
                                'removing': hidingWrongAnswerAlert
                            }
                        )}
                        role='alert'
                    >
                        Try again.
                    </div>
                }
            </form>
            {questionIdx > 0 && <button
                className='btn btn-link back-button'
                onClick={() => dispatch({type: ACTIONS.GO_PREV_QUESTION})}
            >
                ← Back
            </button>}
        </>}
    </div>;
}

export default QuestionRenderer;
