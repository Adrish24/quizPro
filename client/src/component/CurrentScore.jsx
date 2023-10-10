import { useSelector } from "react-redux";

const CurrentScore = () => {
  const { currentScore } = useSelector((state) => state.score);

  return <div className="text-white">Score: {currentScore}</div>;
};

export default CurrentScore;
