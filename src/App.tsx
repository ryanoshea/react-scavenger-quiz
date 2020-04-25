import React from 'react';
import './App.scss';
import 'bootstrap/scss/bootstrap.scss';
import '@fortawesome/fontawesome-free/scss/fontawesome.scss';
import '@fortawesome/fontawesome-free/scss/regular.scss';
import '@fortawesome/fontawesome-free/scss/solid.scss';
import Quiz from './components/Quiz';

const App = () => {
    return (
        <div className='App container'>
            <Quiz></Quiz>
        </div>
    );
};

export default App;
