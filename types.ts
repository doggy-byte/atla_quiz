
export interface CardInfo {
  name: string;
  manaCost: string;
  text: string;
  ruling: string;
}

export interface QuizQuestion {
  card: CardInfo;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}