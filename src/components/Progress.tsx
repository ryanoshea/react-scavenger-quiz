import React from 'react';
import './Progress.scss';
import Emoji from './Emoji';

const Progress = (props: { current: number; total: number }) => {
    const { current, total } = props;

    const percent = Math.round((100 * current) / total);

    return (
        <div className='progress-wrapper'>
            <div className='label'>
                {percent < 100 ? (
                    <span>
                        {current} / {total}
                    </span>
                ) : (
                    <Emoji char='✅' desc='green check' />
                )}
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
