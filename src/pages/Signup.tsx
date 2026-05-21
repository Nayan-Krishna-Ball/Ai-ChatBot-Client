//

import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { IoIosLogIn } from "react-icons/io";

import { useNavigate } from "react-router-dom";
import CustomizedInput from "../components/shared/CustomizedInput";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        toast.error("User already registered", { id: "signup" });
      } else {
        toast.error("Signing Up Failed", { id: "signup" });
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
      {/* <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} />
      </Box> */}
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
        <Typography
          variant="h4"
          textAlign="center"
          padding={2}
          fontWeight={600}
        >
          Signup
        </Typography>
        <CustomizedInput type="text" name="name" label="Name" />
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
          Signup
        </Button>
      </Box>
    </Box>
  );
};

export default Signup;
