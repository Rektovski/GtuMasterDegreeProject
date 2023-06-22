import React, { useEffect, useState, useRef } from 'react';
import {longString} from "./longString";

const HackingPage = () => {
    const [text, setText] = useState('');
    const [showQuestion, setShowQuestion] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [answer, setAnswer] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const hackingContainerRef = useRef(null);

    const textDictionary = longString;

    useEffect(() => {
        let currentIndex = 0;
        let currentText = '';

        const interval = setInterval(() => {
            if (currentIndex >= textDictionary.length) {
                clearInterval(interval);
                setShowQuestion(true);
                setQuestionNumber(generateRandomNumber());
            } else {
                currentText += textDictionary[currentIndex];
                setText(currentText);
                currentIndex++;
            }
        }, 1); // Adjust the interval timing as desired for typing animation

        return () => {
            clearInterval(interval);
        };
    }, []);

    const generateRandomNumber = () => {
        // Generate a random number between 10000 and 1000000000
        return Math.floor(Math.random() * (1000000000 - 10000 + 1)) + 10000;
    };

    const handleAnswer = (e) => {
        e.preventDefault();

        const isPrime = isNumberPrime(questionNumber);
        const isCorrectAnswer = (isPrime && answer.toLowerCase() === 'yiip') || (!isPrime && answer.toLowerCase() === 'niinp');

        if (isCorrectAnswer) {
            setAccessGranted(true);
            localStorage.setItem('pcAuthorized', true);
        }

        window.location.reload();
    };

    const isNumberPrime = (num) => {
        if (num <= 1) {
            return false;
        }

        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) {
                return false;
            }
        }

        return true;
    };

    const handleReset = () => {
        setShowQuestion(false);
        setText('');
        setAccessGranted(false);
        setCountdown(5);

        // Scroll to the bottom of the page after resetting
        if (hackingContainerRef.current) {
            hackingContainerRef.current.scrollTop = hackingContainerRef.current.scrollHeight;
        }
    };

    return (
        <div>
            <div
                ref={hackingContainerRef}
                style={{
                    width: '100vw',
                    height: '100vh',
                    background: 'black',
                    color: 'lime',
                    fontFamily: 'Courier New',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    padding: '20px',
                    overflow: 'hidden', // Hide the overflow to prevent browser scroll
                    display: 'flex',
                    flexDirection: 'column-reverse', // Reverse the flex direction to start writing from bottom to top
                }}
            >
                <div style={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>{text}</div>

                {accessGranted && (
                    <div style={{ fontSize: '40px', marginTop: '2rem' }}>
                        *** ACCESS GRANTED ***
                        <button style={{ marginLeft: '1rem' }} onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                )}
                {showQuestion && !accessGranted && countdown === 0 && (
                    <div style={{ fontSize: '40px', marginTop: '2rem' }}>
                        *** ACCESS DENIED ***
                        <button style={{ marginLeft: '1rem' }} onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                )}

            </div>
            {showQuestion && (
                <div style={{ marginTop: '2rem' }}>
                    {questionNumber}
                    <form onSubmit={handleAnswer}>
                        <input
                            type="password"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            style={{ marginLeft: '1rem' }}
                        />
                    </form>
                </div>
            )}
        </div>
    );
};

export default HackingPage;
