import React, {useEffect, useState, useRef} from 'react';
import {longString} from "./longString";
import "../../styles/hackingPageStyle.css";

const HackingPage = () => {
    const [text, setText] = useState('');
    const [showQuestion, setShowQuestion] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [answer, setAnswer] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);
    const hackingContainerRef = useRef(null);
    const [accessInfo, setAccessInfo] = useState("");

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
    }, [accessGranted]);

    const generateRandomNumber = () => {
        // Generate a random number between 10000 and 1000000000
        let randomNumber = Math.floor(Math.random() * (1000000000 - 100000000 + 1)) + 10000;
        if (randomNumber % 2 === 0) ++randomNumber;
        return randomNumber;
    };

    const handleAnswer = (e) => {
        e.preventDefault();

        const isPrime = isNumberPrime(questionNumber);
        const isCorrectAnswer =
            (isPrime && answer.toLowerCase() === '259916') ||  // isPrime == yiip == 25 9 9 16
            (!isPrime && answer.toLowerCase() === '14991416'); // isNotPrime == niinp == 14 9 9 14 16

        if (isCorrectAnswer) {
            setAccessGranted(true);
            localStorage.setItem('pcAuthorized', true);
            setAccessInfo("***ACCESS GRANTED***");
            setTimeout(() => {
                window.location.reload();
            }, 12000);
        }
        else {
            setAccessGranted(false);
            setAccessInfo("***ACCESS DENIED***");
            setTimeout(() => {
                setAccessInfo("");
                setAnswer("");
                setQuestionNumber(generateRandomNumber());
            }, 3000);
        }
    };

    useEffect(() => {

    }, [accessInfo]);

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

    return (
        <div>
            <div
                ref={hackingContainerRef}
                className={'hackingPageContainer'}
            >
                {
                    !accessGranted && <div className={'hackingPageScript'}>{text}</div>
                }

            </div>
            {showQuestion && (
                <div className={`${accessGranted ? "questionContainerAfterCorrectAnswer" : "questionContainer"}`}>
                    <div>
                        {
                            !accessGranted &&
                            <>
                                <div className={'hackingQuestionNumber'}>
                                    {accessInfo === "" && questionNumber}
                                </div>
                                {
                                    accessInfo === "" &&
                                    <form onSubmit={handleAnswer}>
                                        <input
                                            type="password"
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            className={'hackingQuestionInput'}
                                        />
                                    </form>
                                }
                            </>
                        }
                        <div className={'hackingQuestionAnswer'}>
                            {
                                accessGranted ? accessInfo :
                                    <>
                                    {accessInfo === "***ACCESS DENIED***" && accessInfo}
                                    </>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HackingPage;