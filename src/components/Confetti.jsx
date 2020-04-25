import React, { useEffect } from 'react';
import './Confetti.scss';
import DropConfetti from './DropConfetti';

const Confetti = () => {
    useEffect(() => DropConfetti(), []);

    return (
        <div className='confetti-container'>
            <canvas id='canvas'></canvas>
        </div>
    );
};

export default Confetti;
