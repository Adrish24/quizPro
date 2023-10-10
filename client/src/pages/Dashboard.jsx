import { Box } from "@mui/material";
import Navbar from "../component/Navbar";
import Start from "../component/Start";
import { useSelector } from "react-redux";
import LeaderBoard from "../component/LeaderBoard";

const Dashboard = () => {
  const {showLeaderBoard} = useSelector((state) => state.leaderboard);
  return (
    <Box className="bg-[#051c29] h-screen">
      <Navbar />
      {showLeaderBoard ? <LeaderBoard/> : <Start />}
    </Box>
  );
};

export default Dashboard;
