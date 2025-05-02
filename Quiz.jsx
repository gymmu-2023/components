import React, { useState } from 'react';

// Funktion zum Mischen eines Arrays
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

// Answer-Komponente
const Answer = ({ children, correct, onClick }) => {
    const [backgroundColor, setBackgroundColor] = useState('');

    const handleMouseEnter = () => {
        setBackgroundColor('#303030'); // Helleres Grau beim Hover
    };

    const handleMouseLeave = () => {
        if (backgroundColor === '#303030') {
            setBackgroundColor(''); // Zurücksetzen der Hintergrundfarbe
        }
    };

    const handleClick = () => {
        if (correct === "yes") {
            setBackgroundColor('green');
        } else if (correct === "no") {
            setBackgroundColor('red');
            setTimeout(() => {
                setBackgroundColor('');
                onClick();
            }, 1000);
        }
    };

    return (
        <li onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ backgroundColor, padding: '0.5rem' }}>
            {children}
        </li>
    );
};

// Answers-Komponente
const Answers = ({ children }) => {
    const [shuffledChildren, setShuffledChildren] = useState(React.Children.toArray(children));

    // Funktion zum Mischen der Antworten
    const shuffleAnswers = () => {
        setShuffledChildren(shuffleArray([...shuffledChildren]));
    };

    return (
        <ol style={{ listStyleType: 'lower-alpha' }}>
            {React.Children.map(shuffledChildren, (child) =>
                React.cloneElement(child, { onClick: shuffleAnswers })
            )}
        </ol>
    );
};

// Question-Komponente
const Question = ({ children }) => {
    return (
        <h4>
            {children}
        </h4>
    );
};

// Quiz-Komponente
const Quiz = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export { Answer, Answers, Question, Quiz };
