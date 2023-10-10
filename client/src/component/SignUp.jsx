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
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { authCardStyle, inputStyle } from "../styles/Styles";

function SignUp({ handleToggle }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmePassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [message, setMessage] = useState("");

  const { createUser } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (confirmePassword === password && username) {
        const response = await createUser(email, password);

        const user = response.user;
        await updateProfile(user, { displayName: username });
        setSuccess(true);
      } else {
        if (confirmePassword !== password) {
          setSuccess(false);
          setMessage(
            <Alert className="mb-4" variant="filled" severity="error">
              password doesn&apos;t match
            </Alert>
          );
        }
        if (!username) {
          setSuccess(false);
          setMessage(
            <Alert className="mb-4" variant="filled" severity="error">
              No username provided
            </Alert>
          );
        }
      }
    } catch (error) {
      console.log(error);
      setSuccess(false)
      setMessage(
        <Alert className="mb-4" variant="filled" severity="error">
          Sign Up failed: {error.message}
        </Alert>
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      style={authCardStyle}
      className="min-h-[400px] w-[400px] flex flex-col justify-center  p-5"
      variant="outlined"
    >
      {loading ? (
        <Box className="flex justify-center items-center">
          <CircularProgress />
        </Box>
      ) : success ? (
        <Box className="flex flex-col justify-center items-center">
          <Alert className="mb-4" variant="filled" severity="success">
            Sign Up Successfully
          </Alert>
          <Button onClick={handleToggle}>login</Button>
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
            Sign Up
          </Typography>
          {message}
          <Box className="flex flex-col justify-center">
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

            {/* confirme password */}
            <TextField
              type="password"
              value={confirmePassword}
              onChange={(text) => setConfirmePassword(text.target.value)}
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
              label="Confirme Password"
              size="small"
            />
            <Box className="flex flex-col justify-center gap-2 my-2">
              <Button variant="contained" onClick={handleSignUp}>
                Sign Up
              </Button>
              <Button onClick={handleToggle}>Already Exist?</Button>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
}

export default SignUp;
