import React from 'react';

const Emoji = (props: {char: string, desc: string}) => {
    const { char, desc } = props;
    return <span
        role='img'
        className='emoji'
        aria-label={desc
    }>
        {char}
    </span>
};

export default Emoji;
