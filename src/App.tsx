import React from 'react';
import './App.scss';
import 'bootstrap/scss/bootstrap.scss';
import Quiz from './components/Quiz';

const App = () => {
    return (
        <div className='App container'>
            <Quiz></Quiz>
        </div>
    );
};

export default App;
