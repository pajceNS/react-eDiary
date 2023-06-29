import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const TeacherEdit = () => {
    const data = useLoaderData();
    const teacher = data[0];
    const navigate = useNavigate();

    const [name, setName] = useState(teacher.name);
    const [lastName, setLastName] = useState(teacher.lastName);
    const [userName, setUserName] = useState(teacher.userName);
    const [password, setPassword] = useState(teacher.password);
    const [confirmedPassword, setConfirmedPassword] = useState(teacher.confirmedPassword);
    const [email, setEmail] = useState(teacher.email);
    const [role, setRole] = useState(teacher.role);

    const [globalError, setGlobalError] = useState(false);
    const [errorName, setErrorName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorUserName, setErrorUserName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmedPassword, setErrorConfirmedPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorRole, setErrorRole] = useState("");

    const updateTeacher = async () => {
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
        };
        let response = await fetch(`http://localhost:8080/api/v1/skolskidnevnik/user/admin/teacher/${teacher.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(new_teacher),
        });
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            alert("Uspesno ste izmenili nastavnika");
            navigate("/teachers");
        } else {
            console.log("Izmena nastavnika nije uspela");
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
                    placeholder="Teacher"
                    value={name}
                    error={errorName === "" ? false : true}
                    helperText={errorName}
                    onChange={(e) => {
                        setName(e.target.value);
                        if (e.target.value !== "") setErrorName("");
                        else setErrorName("Please enter name of the teacher.");
                    }}
                />
                {/* lastName */}
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-lastName-input"
                    label="Last name"
                    placeholder="Last name"
                    value={lastName}
                    error={errorLastName === "" ? false : true}
                    helperText={errorLastName}
                    onChange={(e) => {
                        setLastName(e.target.value);
                        if (e.target.value !== "") setErrorLastName("");
                        else setErrorLastName("Please enter Last name of the teacher.")
                    }}
                />
                {/* username */}
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-lastName-input"
                    label="User name"
                    placeholder="User name"
                    value={userName}
                    error={errorUserName === "" ? false : true}
                    helperText={errorUserName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                        if (e.target.value !== "") setErrorUserName("");
                        else setErrorUserName("Please enter Username of the teacher.")
                    }}
                />
                {/* password */}
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-lastName-input"
                    label="password"
                    placeholder="password"
                    value={password}
                    error={errorPassword === "" ? false : true}
                    helperText={errorPassword}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        if (e.target.value !== "") setErrorPassword("");
                        else setErrorPassword("Please enter password of the teacher.")
                    }}
                />
                {/* confirmedPassword */}
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-lastName-input"
                    label="confirmed password"
                    placeholder="confirmed password"
                    value={confirmedPassword}
                    error={errorConfirmedPassword === "" ? false : true}
                    helperText={errorConfirmedPassword}
                    onChange={(e) => {
                        setConfirmedPassword(e.target.value);
                        if (e.target.value !== "") setErrorConfirmedPassword("");
                        else setErrorConfirmedPassword("Please enter confirmed password of the teacher.")
                    }}
                />
                {/* email */}
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-lastName-input"
                    label="email"
                    placeholder="email"
                    value={email}
                    error={errorEmail === "" ? false : true}
                    helperText={errorEmail}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value !== "") setErrorEmail("");
                        else setErrorEmail("Please enter email of the teacher.")
                    }}
                />
                {/* role */}
                <TextField
                    sx={{ width: "100px" }}
                    fullWidth
                    required
                    id="outlined-lastName-input"
                    label="Role"
                    placeholder="Role"
                    value={role}
                    error={errorRole === "" ? false : true}
                    helperText={errorRole}
                    onChange={(e) => {
                        setRole(e.target.value);
                        if (e.target.value !== "") setErrorRole("");
                        else setErrorRole("Please enter role of the teacher.")
                    }}
                />

                <Button
                    onClick={updateTeacher}
                    disabled={
                        errorName || errorLastName || errorUserName || errorPassword
                        || errorConfirmedPassword || errorEmail || errorRole
                    }
                >
                    Save
                </Button>
                <FormHelperText error={globalError}>{globalError}</FormHelperText>
            </Box>
        </Container>
    );
};

export default TeacherEdit;