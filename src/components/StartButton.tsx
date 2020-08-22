import React, { useState, useEffect } from 'react';
import Emoji from './Emoji';
import { START_BUTTON_EMOJIS } from '../data/QuizData';
import './StartButton.scss';

const StartButton = (props: { onClick: () => void }) => {
    const { onClick } = props;
    const [imageIdx, setImageIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setImageIdx(curImageIdx => (curImageIdx + 1) % START_BUTTON_EMOJIS.length),
            275
        );
        return () => clearInterval(interval);
    }, []);

    const emoji = START_BUTTON_EMOJIS[imageIdx];

    return (
        <button className='btn btn-success btn-lg' onClick={() => onClick()}>
            <strong>Start!</strong> <Emoji char={emoji.char} desc={emoji.desc} />
        </button>
    );
};

export default StartButton;
