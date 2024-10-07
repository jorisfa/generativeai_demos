import React from 'react';
import Card from './CardBlock'; // Assuming the Card component is in the same directory

interface ScoreCardProps {
  score: number; // The score to display
  label: string;
  className?: string; // Optional class name
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, label, className }) => {
  let variant: 'positive' | 'info' | 'warning' | 'danger';
  if(label == 'Positive'){
    variant = 'positive';
  } else if(label == 'Neutral'){
    variant = 'info'
  } else {
    variant = 'danger'
  }

  return (
    <Card variant={variant} className="flex flex-col items-center justify-center space-y-2">
      <h3 className="text-lg font-semibold">
        {label}
      </h3>
      <div className="text-4xl font-bold">{score}</div>
    </Card>
  );
};

export default ScoreCard;
