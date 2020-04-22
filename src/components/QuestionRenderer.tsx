import React from 'react';
import { Question } from '../data/QuizData';
import { DISPATCH_TYPE, ACTIONS, State } from '../reducer/State';

const QuestionRenderer = (props: {
    model: Question,
    state: State,
    dispatch: React.Dispatch<DISPATCH_TYPE>
}) => {
    const {
        model,
        state: { answer, prevSubmitIncorrect },
        dispatch
    } = props;

    const submit = () => dispatch({
        type: ACTIONS.SUBMIT_ANSWER
    });

    return <div className='question'>
        {model.prompts.map((prompt, i) => <p
            key={i}
            className='prompt'
        >
            {prompt}
        </p>)}
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
            {prevSubmitIncorrect && <div className='alert alert-danger' role='alert'>
                Try again.
            </div>}
        </form>
    </div>;
}

export default QuestionRenderer;
