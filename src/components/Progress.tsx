import React from 'react';
import './Progress.scss';

const Progress = (props: { current: number; total: number }) => {
    const { current, total } = props;

    const percent = Math.round((100 * current) / total);

    return (
        <div className='progress-wrapper'>
            <div className='label'>
                <span>
                    {current}/{total}
                </span>
            </div>
            <div className='progress'>
                <div
                    className='bar'
                    style={{
                        width: percent + '%',
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Progress;
