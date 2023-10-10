import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useEffect, useRef, useState } from "react";
import Logout from "./Logout";
import { toggleProfileMenu } from "../store/profileMenuSlice";
import { toggleNavMenu } from "../store/navMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { toggleLeaderBoard } from "../store/leaderBoardSlice";


const pages = ["About", "Leaderboard", "News"];
const settings = ["Profile", "Account", "Dashboard"];

const Navbar = () => {
  const [highestScore, setHighestScore] = useState(0)


  const { user } = useAuth();
  const { userData } = useSelector(state => state.apiPost);
  const showNavMenu = useSelector((state) => state.navMenu);
  const showProfMenu = useSelector((state) => state.profileMenu);
  const dispatch = useDispatch();

  const navMenuRef = useRef();
  const profMenuRef = useRef();

  const handleNavOpen = () => {
    dispatch(toggleNavMenu());
  };

  const handleProfileMenuOpen = () => {
    dispatch(toggleProfileMenu());
  };
  
  // handling window click events
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        showNavMenu &&
        navMenuRef.current &&
        !navMenuRef.current.contains(e.target)
      ) {
        dispatch(toggleNavMenu());
      }

      if (
        showProfMenu &&
        profMenuRef.current &&
        !profMenuRef.current.contains(e.target)
      ) {
        dispatch(toggleProfileMenu());
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [showNavMenu, showProfMenu]);

  useEffect(() => {
    console.log(userData)
    if(userData.length !== 0){
      const calculateScore = userData.reduce((maxScore, item) => {
        if(item.score > maxScore){
          return item.score
        }
        return maxScore
      },0)
      setHighestScore(calculateScore)
    }
  },[userData])

  return (
    <Box position="static" className={`flex bg-[#093147] h-[64px] px-6`}>
      <Box
        className="flex items-center mr-10 cursor-pointer"
        sx={{
          display: { xs: "none", md: "flex" },
        }}
        onClick={() => dispatch(toggleLeaderBoard(false))}
      >
        <p className="text-[30px] text-teal-200 font-semibold">Quiz</p>
        <p className="text-[20px] text-yellow-500 font-bold">Pro</p>
      </Box>
      <Box
        className="grow"
        sx={{
          display: { xs: "flex", md: "none" },
        }}
      >
        <IconButton
          ref={navMenuRef}
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleNavOpen}
        >
          <MenuIcon className="text-teal-200 relative" />
        </IconButton>
        <Box
          className={`absolute top-[60px] z-10 ${
            showNavMenu ? "flex" : "hidden"
          } flex-col bg-teal-100 py-2 rounded-sm`}
        >
          {pages.map((page,i) => (
            <Link
              key={page}
              className="p-2 text-[16px] font-semibold text-[#008080] hover:bg-[#084566]"
              onClick={i === pages.length - 2 ? () => dispatch(toggleLeaderBoard(true)) : null}
            >
              {page}
            </Link>
          ))}
        </Box>
      </Box>
      <Box
        className="grow flex items-center cursor-pointer"
        sx={{
          display: { xs: "flex", md: "none" },
        }}
        onClick={() => dispatch(toggleLeaderBoard(false))}
      >
        <p className="text-[25px] text-teal-200 font-semibold">Quiz</p>
        <p className="text-[15px] text-yellow-500 font-bold">Pro</p>
      </Box>
      <Box
        className="grow flex items-center"
        sx={{
          display: { xs: "none", md: "flex" },
        }}
      >
        {pages.map((page, i) => (
          <Link
            key={page}
            className={`${
              i === pages.length - 1 ? "text-yellow-500" : "text-teal-200"
            } text-[16px] hover:bg-[#084566] hover:rounded-sm p-2 font-semibold`}
            onClick={i === pages.length - 2 ? () => dispatch(toggleLeaderBoard(true)) : null}
          >
            {page}
          </Link>
        ))}
      </Box>
      <Box className="grow-0 flex items-center relative cursor-pointer bg-[#051b30] m-2 ml-4 sm:ml-2 p-2 rounded-lg">
        <IconButton ref={profMenuRef} onClick={handleProfileMenuOpen} sx={{padding:0}}>
          <Avatar />
          {user && <p className="text-[#7fd3d3] text-[12px] sm:text-[16px] ml-2">{user.displayName}</p>}
        </IconButton>
        <Box
          className={`absolute top-[60px] right-0 z-10 ${
            showProfMenu ? "flex" : "hidden"
          } flex-col bg-teal-100 py-2 rounded-sm`}
        >
          <p className="px-10 text-[16px] font-semibold text-[#803409] whitespace-nowrap" >Higest Score: {highestScore}</p>
          {settings.map((setting) => (
            <Link
              key={setting}
              className="p-2 text-center text-[16px] font-semibold text-[#008080] hover:bg-[#084566]"
            >
              {setting}
            </Link>
          ))}
          <Logout />
        </Box>
      </Box>
    </Box>
  );
};
export default Navbar;
