
import React from 'react';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  let feedbackMessage = '';
  if (percentage === 100) {
    feedbackMessage = "完璧です！あなたは真のルールの達人ですね！";
  } else if (percentage >= 80) {
    feedbackMessage = "素晴らしい成績です！あともう一歩！";
  } else if (percentage >= 50) {
    feedbackMessage = "良い調子です。もう少しでマスターできます！";
  } else {
    feedbackMessage = "お疲れ様でした。再挑戦してルールをマスターしよう！";
  }

  return (
    <div className="w-full max-w-md text-center bg-slate-800 rounded-xl shadow-2xl shadow-cyan-500/10 p-8 animate-fade-in">
      <h3 className="font-cinzel text-3xl font-bold text-amber-200 mb-4">クイズ終了</h3>
      <p className="text-slate-300 text-lg mb-6">あなたのスコア:</p>
      <div className="text-6xl font-bold text-cyan-400 mb-2">
        {score} <span className="text-3xl text-slate-400">/ {totalQuestions}</span>
      </div>
      <p className="text-xl text-amber-300 font-semibold mb-8">({percentage}%)</p>
      <p className="text-slate-300 mb-8">{feedbackMessage}</p>
      <button
        onClick={onRestart}
        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 focus:ring-offset-slate-800"
      >
        もう一度挑戦する
      </button>
    </div>
  );
};

export default QuizResult;
