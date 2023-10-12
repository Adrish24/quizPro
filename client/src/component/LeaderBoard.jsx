import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingScreen from "./LoadingScreen";
import Stack from "@mui/material/Pagination";
import Pagination from "@mui/material/Stack";


const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useSelector((state) => state.apiPost);

  useEffect(() => {
    setLoading(true);
    if (userData.length !== 0) {
      const tempData = [...userData];
      const data = tempData.reduce((acc, item) =>{
        const name = item.name;
        const score = item.score;
        const uid = item.uid;

        if(!acc[uid] || score > acc[uid].score) {
          acc[uid] = {name, score};
        }
        return acc;
      },{})
      const dataArray = Object.values(data)
      const sortedArray = dataArray.sort((a,b) => b.score-a.score)
      setLeaderBoard(sortedArray)
    }
    setLoading(false);
  }, [userData]);

  useEffect(() => {
    console.log(leaderBoard)
  },[leaderBoard]);

  return (
    <Box className="w-full flex flex-col items-center p-4">
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
                } w-full sm:w-[50%] h-[50px] flex justify-evenly text-center items-center rounded-sm`}
                key={i}
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
            )).slice(0,10)}
        </>
      )}
      <Stack spacing={2}>
        <Pagination count={10} color='secondary'/>
      </Stack>
    </Box>
  );
};

export default LeaderBoard;
