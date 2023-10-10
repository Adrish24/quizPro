import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import difficulty from "../module/difficulty";
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedDifficulty,
  toggleDifficultyDrop,
} from "../store/difficultySlice";

const DifficultySelect = () => {
  const dispatch = useDispatch();
  const { difficultyDrop, selectedDifficulty } = useSelector(
    (state) => state.difficulty
  );

  const difficultyRef = useRef();

  const handleDifficultyDrop = () => {
    dispatch(toggleDifficultyDrop());
  };

  const handleSelectDifficulty = (item) => {
    dispatch(setSelectedDifficulty(item));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        difficultyDrop &&
        difficultyRef.current &&
        !difficultyRef.current.contains(e.target)
      ) {
        dispatch(toggleDifficultyDrop());
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [difficultyDrop]);

  return (
    <Box
      className="bg-[#093147] w-full p-2 rounded-md mb-[10px] cursor-pointer outline-2 outline-teal-300 relative z-[10]"
      onClick={handleDifficultyDrop}
      ref={difficultyRef}
    >
      <input
        className="bg-transparent text-[#7fd3d3] placeholder-[#7fd3d3] outline-none border-none cursor-pointer select-none"
        type="text"
        readOnly
        placeholder="Difficulty"
        value={selectedDifficulty}
      />
      {difficultyDrop ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      {difficultyDrop ? (
        <Box className="absolute top-[40px] left-0 w-full bg-[#bae3e3] rounded-b-md py-2">
          {difficulty.map((item) => (
            <Box
              className="px-3 py-1 font-semibold text-[#008080] hover:bg-[#084566]"
              key={item}
              onClick={() => handleSelectDifficulty(item)}
            >
              {item}
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
}

export default DifficultySelect;
