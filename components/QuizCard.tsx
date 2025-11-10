import React from 'react';
import type { QuizQuestion } from '../types';

interface QuizCardProps {
  question: QuizQuestion;
  cardNumber: number;
  totalCards: number;
  onAnswer: (answerIndex: number) => void;
  onNext: () => void;
  userAnswer: number | null;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, cardNumber, totalCards, onAnswer, onNext, userAnswer }) => {
  const isAnswered = userAnswer !== null;

  const shuffledOptions = React.useMemo(() => {
    const optionsWithIndices = question.options.map((option, index) => ({ text: option, originalIndex: index }));
    // Fisher-Yates shuffle for better randomization
    for (let i = optionsWithIndices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [optionsWithIndices[i], optionsWithIndices[j]] = [optionsWithIndices[j], optionsWithIndices[i]];
    }
    return optionsWithIndices;
  }, [question]);

  const getButtonClass = (index: number) => {
    if (!isAnswered) {
      return 'bg-slate-700 hover:bg-slate-600 focus:ring-cyan-500';
    }
    if (index === question.correctAnswerIndex) {
      return 'bg-green-700 focus:ring-green-500';
    }
    if (index === userAnswer) {
      return 'bg-red-700 focus:ring-red-500';
    }
    return 'bg-slate-800 text-slate-500';
  };

  const renderManaCost = (cost: string) => {
    const symbols = cost.match(/\{(.+?)\}/g) || [];
    return symbols.map((symbol, index) => {
      const symbolKey = symbol.replace(/\{|\}/g, '').toUpperCase();
      let colorClass = 'bg-gray-500';
      let symbolText = symbolKey;
  
      if (symbolKey === 'W') {
        colorClass = 'bg-yellow-200 text-slate-800';
      } else if (symbolKey === 'U') {
        colorClass = 'bg-blue-400 text-slate-800';
      } else if (symbolKey === 'B') {
        colorClass = 'bg-slate-600 text-slate-100';
      } else if (symbolKey === 'R') {
        colorClass = 'bg-red-500 text-slate-100';
      } else if (symbolKey === 'G') {
        colorClass = 'bg-green-500 text-slate-100';
      } else if (!isNaN(parseInt(symbolKey))) {
          colorClass = 'bg-slate-500 text-slate-100';
      }
      
      return (
        <span key={index} className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shadow-inner shadow-black/20 ${colorClass}`}>
          {symbolText}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-2xl bg-slate-800 rounded-xl shadow-2xl shadow-cyan-500/10 p-6 md:p-8 animate-fade-in transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">{question.card.name}</h3>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">{renderManaCost(question.card.manaCost)}</div>
          <p className="text-sm text-slate-400">{cardNumber} / {totalCards}</p>
        </div>
      </div>
      
      <div className="bg-slate-900/50 p-4 rounded-lg mb-6 border border-slate-700">
        <p className="text-slate-300 whitespace-pre-wrap">{question.card.text}</p>
      </div>

      <p className="text-lg text-slate-100 mb-4">{question.question}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {shuffledOptions.map(({ text, originalIndex }) => (
          <button
            key={originalIndex}
            onClick={() => onAnswer(originalIndex)}
            disabled={isAnswered}
            className={`w-full text-left p-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${getButtonClass(originalIndex)} ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {text}
          </button>
        ))}
      </div>
      
      {isAnswered && (
        <div className="animate-fade-in mt-4">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
            <h4 className="font-bold text-amber-300 mb-2">解説</h4>
            <p className="text-slate-300 mb-4">{question.explanation}</p>
            <hr className="border-slate-700 my-3" />
            <h5 className="font-bold text-slate-400 text-sm mb-1">関連ルール</h5>
            <p className="text-slate-400 text-sm italic">« {question.card.ruling} »</p>
          </div>
          <button
            onClick={onNext}
            className="w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-800"
          >
            {cardNumber === totalCards ? '結果を見る' : '次の問題へ'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCard;