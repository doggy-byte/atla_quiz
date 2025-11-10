
import React, { useState, useCallback } from 'react';
import { quizData } from './data/quizData';
import QuizCard from './components/QuizCard';
import QuizResult from './components/QuizResult';

type QuizState = 'ongoing' | 'finished';

const App: React.FC = () => {
  const [quizState, setQuizState] = useState<QuizState>('ongoing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(quizData.length).fill(null));
  const [score, setScore] = useState(0);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (userAnswers[currentQuestionIndex] !== null) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setUserAnswers(newAnswers);

    if (answerIndex === quizData[currentQuestionIndex].correctAnswerIndex) {
      setScore(prevScore => prevScore + 1);
    }
  }, [currentQuestionIndex, userAnswers]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizState('finished');
    }
  }, [currentQuestionIndex]);

  const handleRestart = useCallback(() => {
    setQuizState('ongoing');
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(quizData.length).fill(null));
    setScore(0);
  }, []);

  const currentQuestion = quizData[currentQuestionIndex];
  const userAnswer = userAnswers[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-cyan-500/20">
      <header className="w-full max-w-2xl mx-auto text-center mb-8">
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-300">Magic: The Gathering</h1>
        <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-amber-300">Avatar Rule Quiz</h2>
      </header>
      
      <main className="w-full flex-grow flex items-center justify-center">
        {quizState === 'ongoing' ? (
          <QuizCard
            key={currentQuestionIndex}
            question={currentQuestion}
            cardNumber={currentQuestionIndex + 1}
            totalCards={quizData.length}
            onAnswer={handleAnswer}
            onNext={handleNext}
            userAnswer={userAnswer}
          />
        ) : (
          <QuizResult
            score={score}
            totalQuestions={quizData.length}
            onRestart={handleRestart}
          />
        )}
      </main>
      
      <footer className="w-full max-w-2xl mx-auto text-center mt-8">
          <p className="text-slate-500 text-sm">
              Based on the "Magic: The Gathering | Avatar: The Last Airbender" release notes.
          </p>
      </footer>
    </div>
  );
};

export default App;
