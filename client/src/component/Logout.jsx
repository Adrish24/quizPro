import { Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/authentication");
    } catch (error) {
      console.log("Failed to sign out: ", error.message);
    }
  };
  return <Button color="error" onClick={handleLogout}>Log out</Button>;
}

export default Logout;
