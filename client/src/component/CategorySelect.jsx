import category from "../module/category";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedCategory,
  toggleCategoryDrop,
  setSelectedCategoryValue
} from "../store/categorySlice";

const CategorySelect = () => {
  const dispatch = useDispatch();
  const { categoryDrop, selectedCategory } = useSelector(
    (state) => state.category
  );
  const categoryRef = useRef();

  const handleCategoryDrop = () => {
    dispatch(toggleCategoryDrop());
  };

  const handleSelectCategory = (item) => {
    dispatch(setSelectedCategory(item.label));
    dispatch(setSelectedCategoryValue(item.value));
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        categoryDrop &&
        categoryRef.current &&
        !categoryRef.current.contains(e.target)
      ) {
        dispatch(toggleCategoryDrop());
      }
    };

    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, [categoryDrop]);

  return (
    <Box
      className="bg-[#093147] w-full p-2 rounded-md mb-[10px] cursor-pointer outline-2 outline-teal-300 relative z-[11] "
      onClick={handleCategoryDrop}
      ref={categoryRef}
    >
      <input
        className="bg-transparent text-[#7fd3d3] placeholder-[#7fd3d3] outline-none border-none cursor-pointer select-none"
        type="text"
        readOnly
        placeholder="Category"
        value={selectedCategory}
      />
      {categoryDrop ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      {categoryDrop ? (
        <Box className="absolute top-[40px] left-0 w-full bg-[#bae3e3] rounded-b-md py-2">
          {category.map((item) => (
            <Box
              className="px-3 py-1 font-semibold text-[#008080] hover:bg-[#084566]"
              key={item.value}
              onClick={() => handleSelectCategory(item)}
            >
              {item.label}
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

export default CategorySelect;
