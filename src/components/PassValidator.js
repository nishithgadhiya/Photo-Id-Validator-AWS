import React, { useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";

const PassValidator = () => {
  const [imageFile, setImageFile] = useState(null);
  const [base64EncodedImage, setBase64EncodedImage] = useState(null);
  const [color, setColor] = useState("green");
  const [validate, setValidate] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64EncodedImage = btoa(reader.result);
      setBase64EncodedImage(base64EncodedImage);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}`,
        {
          type: "validate",
          image: base64EncodedImage,
        }
      );
      const data = JSON.parse(response.data.body);

      if (data.match && data.unmatch) {
        setColor("green");
        setValidate("Valid");
      } else {
        setColor("red");
        setValidate("Not Valid !!");
      }
    } catch (error) {
      setValidate("Failure");
    }
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
          background: color,
        }}
      >
        <h1 style={{ fontSize: "4rem" }}>{validate}</h1>
        <h1>Photo Id Validator</h1>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple={false}
              type="file"
              onChange={(event) => handleImageChange(event)}
            />

            {/* <TextField value={fileName} disabled /> */}
          </Box>
          <Button
            variant="contained"
            color="primary"
            disabled={!imageFile}
            sx={{ marginTop: "2rem" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PassValidator;
