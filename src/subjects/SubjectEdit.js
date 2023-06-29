import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const SubjectEdit = () => {
  const data = useLoaderData();
  const subject = data[0];
  const navigate = useNavigate();

  const [name, setName] = useState(subject.name);
  const [hours, setHours] = useState(subject.hours);

  const [globalError, setGlobalError] = useState(false);
  const [nameError, setNameError] = useState("");
  const [hoursError, setHoursError] = useState("");

  const update = async () => {
    if (name == "" || hours == "") {
      setGlobalError("Please fill all fields in the form");
      return;
    }

    const new_subject = {
      name: name,
      hours: hours
    };
    let response = await fetch(`http://localhost:8080/api/v1/skolskidnevnik/subject/${subject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_subject),
    });
    console.log(response);
    if (response.ok) {
      let d = await response.json();
      alert("Uspesno ste izmenili predmet");
      navigate("/subjects");
    } else {
      console.log("Izmena predmeta nije uspela");
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
          value={name}
          helperText={nameError}
          error={nameError === "" ? false : true}
          onChange={(e) => {
            setName(e.target.value);
            if (e.target.value !== "") setNameError("");
            else setNameError("Please enter name of the subject.");
          }}
        />
        <TextField
          sx={{ width: "100px" }}
          fullWidth
          required
          id="outlined-hours-input"
          label="Hours"
          value={hours}
          error={hoursError}
          helperText={hoursError}
          onChange={(e) => {
            setHours(e.target.value);
            if (e.target.value !== "") setHoursError("");
            else setHoursError("Please enter number of hours for the subject.");
          }}
        />

        <Button
          onClick={update}
          disabled={nameError || hoursError}
        >
          {" "}
          Save{" "}
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );
};

export default SubjectEdit;