import { Box, TextField, Button, FormControl } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogged }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const staticPassword = "asklAS76523!@";
  const staticEmail = "adminvalidator@gmail.com";

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password) {
    return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
      password
    );
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError(null);

    if (isValidEmail(email) && isValidPassword(password)) {
      if (email === staticEmail && password === staticPassword) {
        setIsLogged(true);
        navigate("/admin");
      } else {
        setError("Email or Password is invalid");
      }
    } else {
      setError("Email or Password is invalid");
    }
  };
  return (
    <Box
      sx={{
        width: "30%",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        margin: "auto",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <FormControl>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          type="email"
          autoFocus
          onChange={handleEmailChange}
        />

        <TextField
          sx={{ marginTop: "2rem" }}
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoFocus
          onChange={handlePasswordChange}
        />
        {error && <h2 style={{ color: "red" }}>{error}</h2>}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "2rem", padding: "0.8rem 12rem" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default Login;
