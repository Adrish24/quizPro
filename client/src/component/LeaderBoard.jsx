import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.apiPost);

  useEffect(() => {
    if (userData.length !== 0) {
      setLoading(true);
      const tempData = [...userData];
      const data = tempData
        .sort((a, b) => b.score - a.score)
        .filter((item) => item.score > 0);
      setLeaderBoard(data);
      setLoading(false);
    }
  }, [userData]);
  return (
    <Box className="w-full flex flex-col items-center p-4 overflow-auto">
      <h1 className="text-[#7fd3d3] sm:text-[25px] font-semibold mb-4">
        Leaderboard
      </h1>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {leaderBoard &&
            leaderBoard.map((item, i) => (
              <Box
                className={`${
                  i % 2 === 0 ? "bg-[#bae3e3]" : "bg-[#093147]"
                } w-full sm:w-[50%] h-[60px] flex justify-evenly text-center items-center rounded-sm`}
                key={item.session}
              >
                <span
                  className={`${
                    i === 0
                      ? "text-[#FFB500]"
                      : i === 1
                      ? "text-[#C0C0C0]"
                      : i === 2
                      ? "text-[#CD7F32]"
                      : "text-[#051b30]"
                  } text-start font-bold text-[30px]`}
                >
                  {i + 1}
                  {i === 0 ? "st" : i === 1 ? "nd" : "th"}
                </span>
                <span
                  className={`${
                    i % 2 === 0 ? "text-[#093147]" : "text-[#bae3e3]"
                  } font-bold sm:text-[20px]`}
                >
                  {item.score}
                </span>
                <span
                  className={`${
                    i % 2 === 0 ? "text-[#093147]" : "text-[#bae3e3]"
                  } font-bold uppercase`}
                >
                  {item.name}
                </span>
              </Box>
            ))}
        </>
      )}
    </Box>
  );
};

export default LeaderBoard;
