import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { IoIosLogIn } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);

      if (error.response.status === 401) {
        toast.error("This email is not registered", { id: "login" });
      } else if (error.response.status === 403) {
        toast.error("Incorrect Password", { id: "login" });
      } else {
        toast.error("Signing In Failed", { id: "login" });
      }
    }
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 2, sm: 4 },
          boxShadow: "10px 10px 20px #000",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight={600} mb={2}>
          Login
        </Typography>

        <CustomizedInput type="email" name="email" label="Email" />
        <CustomizedInput type="password" name="password" label="Password" />

        <Button
          type="submit"
          fullWidth
          sx={{
            mt: 2,
            py: 1,
            borderRadius: 2,
            bgcolor: "#00fffc",
            color: "black",
            ":hover": {
              bgcolor: "white",
              color: "black",
            },
          }}
          endIcon={<IoIosLogIn />}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
export default Login;
