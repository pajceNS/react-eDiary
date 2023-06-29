import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";

const TeacherForm = () => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const [errorName, setErrorName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmedPassword, setErrorConfirmedPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorRole, setErrorRole] = useState("");
    const navigate = useNavigate();

    const addNewTeacher = async () => {
        if (name == '' || lastName == '' || userName == '' || password == ''
            || confirmedPassword == '' || email == '' || role == '') {
            setGlobalError('Please fill all fields in the form');
            return;
        }

        const new_teacher = {
            name: name,
            lastName: lastName,
            userName: userName,
            password: password,
            confirmedPassword: confirmedPassword,
            email: email,
            role: role
        }

        let response = await fetch("http://localhost:8080/api/v1/skolskidnevnik/user/admin/teacher", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new_teacher),
        });
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert("Uspesno ste dodali novog nastavnika.");
            navigate("/teachers");
        } else {
            console.log("Dodavanje novog nastavnika nije uspelo.");
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
                {/* name */}
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Teacher name"
                    placeholder="Teacher name"
                    error={errorName === "" ? false : true}
                    helperText={errorName}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (e.target.value !== "") setErrorName("");
                        else setErrorName("Please enter Teacher name.");
                    }}
                />
                {/* lastName */}
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Last Name"
                    placeholder="Last Name"
                    error={errorLastName === "" ? false : true}
                    helperText={errorLastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                        if (e.target.value !== "") setErrorLastName("");
                        else setErrorLastName("Please enter Last name of the teacher.");
                    }}
                />
                {/* userName */}
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Username"
                    placeholder="Username"
                    error={errorUserName === "" ? false : true}
                    helperText={errorUserName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                        if (e.target.value !== "") setErrorUserName("");
                        else setErrorUserName("Please enter Username of the teacher.");
                    }}
                />
                {/* password */}
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="password"
                    placeholder="password"
                    error={errorPassword === "" ? false : true}
                    helperText={errorPassword}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value !== "") setErrorPassword("");
                        else setErrorPassword("Please enter password of the teacher.");
                    }}
                />
                {/* confirmedPassword */}
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="confirmed password"
                    placeholder="confirmed password"
                    error={errorConfirmedPassword === "" ? false : true}
                    helperText={errorConfirmedPassword}
                    onChange={(e) => {
                        setConfirmedPassword(e.target.value);
                        if (e.target.value !== "") setErrorConfirmedPassword("");
                        else setErrorConfirmedPassword("Please enter confirmed password of the teacher.");
                    }}
                />
                {/* email */}
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Email"
                    placeholder="Email"
                    error={errorEmail === "" ? false : true}
                    helperText={errorEmail}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value !== "") setErrorEmail("");
                        else setErrorEmail("Please enter email of the teacher.");
                    }}
                />
                {/* role */}
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Role"
                    placeholder="Role"
                    error={errorRole === "" ? false : true}
                    helperText={errorRole}
                    onChange={(e) => {
                        setRole(e.target.value);
                        if (e.target.value !== "") setErrorRole("");
                        else setErrorRole("Please enter role of the teacher.");
                    }}
                />
                <Button onClick={addNewTeacher} disabled={name === ''}>
                    {" "}
                    Save{" "}
                </Button>
                <FormHelperText error={globalError}>{globalError}</FormHelperText>
            </Box>
        </Container>
    );
};

export default TeacherForm;
