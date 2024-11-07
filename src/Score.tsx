export default function Score({ score }: { score: string | number }) {
  if (score === '-') {
    return (
      <span className="text-gray-500">{score}</span>
    );
  }

  score = Number(score);
  
  if (score < 60) {
    return (
      <span className="text-red-500">{score}</span>
    );
  } else if (score < 80) {
    return (
      <span className="text-yellow-500">{score}</span>
    );
  } else {
    return (
      <span className="text-green-500">{score}</span>
    );
  }
}