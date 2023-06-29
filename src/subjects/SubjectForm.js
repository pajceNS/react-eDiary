import {
  Box,
  Button,
  TextField,
  Container,
  FormHelperText
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SubjectForm = () => {
  const [name, setName] = useState("");
  const [hours, setHours] = useState("");

  const [globalError, setGlobalError] = useState(false);
  const errorMessageTemplate = "Please enter the ";
  const [nameError, setNameError] = useState("");
  const [hoursError, setHoursError] = useState("");
  const navigate = useNavigate();

  const save = async () => {
    if (name == '' || hours == '') {
      //name == '' && setNameError('this field is required');
      //hours == '' && setHoursError('this field is required');
      setGlobalError('Please fill all fields in the form');
      return;
    }

    const new_subject = {
      name: name,
      hours: hours
    };
    let response = await fetch("http://localhost:8080/api/v1/skolskidnevnik/subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_subject),
    });
    console.log(response);
    if (response.ok) {
      let d = await response.json();
      console.log(JSON.stringify(d));
      alert("Uspesno ste dodali novi predmet.");
      navigate("/subjects");
    } else {
      console.log("Dodavanje novog predmeta nije uspelo.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "10px",
          "flex-direction": "column",
          "align-items": "center",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Subject name"
          placeholder="Subject name"
          helperText={nameError}
          error={nameError === "" ? false : true}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value !== "") setNameError("");
            else setNameError(errorMessageTemplate + " name of the subject.");
          }}
        />

        <TextField
          sx={{ width: "100%" }}
          fullWidth
          id="outlined-hours-input"
          label="Hours"
          placeholder="Hours"
          required
          type="number"
          error={hoursError}
          helperText={hoursError}
          onChange={(e) => {
            setHours(e.target.value);
          }}
        />

        <Button onClick={save} disabled={nameError || hoursError}>
          Save
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );
}

export default SubjectForm;