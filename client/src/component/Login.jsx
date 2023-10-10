/* eslint-disable react/prop-types */
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authCardStyle, inputStyle } from "../styles/Styles";

const Login = ({ handleToggle }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);

  const { login, user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${user.uid}/dashboard`);
    }
  }, [user]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      if (username) {
        await login(email, password);
      } else {
        setMessage(
          <Alert className="mb-4" variant="filled" severity="error">
            No username provided
          </Alert>
        );
      }
    } catch (error) {
      console.log(error);
      setMessage(
        <Alert className="mb-4" variant="filled" severity="error">
          Sign In failed: {error.message}
        </Alert>
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      style={authCardStyle}
      className="h-[400px] w-[400px] flex flex-col justify-center  p-5"
      variant="outlined"
    >
      {loading ? (
        <Box className="flex justify-center items-center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            variant="h1"
            fontSize={25}
            fontWeight={500}
            color="white"
            marginBottom="20px"
          >
            Log In
          </Typography>
          {message}
          <Box className="flex flex-col justify-center ">
            {/* username */}
            <TextField
              value={username}
              onChange={(text) => setUsername(text.target.value)}
              InputLabelProps={{
                style: {
                  color: "#acafb0",
                  fontSize: "14px",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              style={inputStyle}
              variant="filled"
              label="Username"
              size="small"
            />

            {/* emial */}
            <TextField
              value={email}
              onChange={(text) => setEmail(text.target.value)}
              InputLabelProps={{
                style: {
                  color: "#acafb0",
                  fontSize: "14px",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              style={inputStyle}
              variant="filled"
              label="Email"
              size="small"
            />

            {/* password */}
            <TextField
              type="password"
              value={password}
              onChange={(text) => setPassword(text.target.value)}
              InputLabelProps={{
                style: {
                  color: "#acafb0",
                  fontSize: "14px",
                },
              }}
              InputProps={{
                style: {
                  color: "white",
                },
              }}
              style={inputStyle}
              variant="filled"
              label="Password"
              size="small"
            />

            {/* <Box className='text-white flex mb-4'>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <p className="ml-2">Remember Me</p>
        </Box> */}

            <Box className="flex flex-col justify-center gap-2 my-2">
              <Button variant="contained" onClick={handleSignIn}>
                Log In
              </Button>
              <Button onClick={handleToggle}>Create account</Button>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
};

export default Login;
