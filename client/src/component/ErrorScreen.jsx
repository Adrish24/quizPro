import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';


const ErrorScreen = () => {
    const { error } = useSelector(state => state.api)
  return (
    <Box className="h-screen w-full flex flex-col justify-center items-center bg-[#051c29]">
      <div className="flex justify-center items-center">
        <p className="text-[60px] text-teal-200 font-semibold">Quiz</p>
        <p className="text-[70px] text-yellow-500 font-bold">Pro</p>
      </div>
      <Typography variant='h6' color='red'>{error}</Typography>
    </Box>
  )
}

export default ErrorScreen
