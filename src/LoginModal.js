import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, TextField } from "@mui/material"
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, handleCloseModal }) => {
    const [open, setOpen] = useState(show);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();

    const closeModal = () => {
        setOpen(false);
        handleCloseModal();
    }

    const loginUser = () => {
        if (username === "test@gmail.com" && password === "test") {
            localStorage.setItem("user", JSON.stringify({
                username: "Test",
                name: "Nemanja",
                surname: "Pajcin"
            }));
            closeModal();
            navigate('subjects');
        } else {
            setErrorMessage("Wrong username or password");
        }
    }

    return <Dialog open={open}>
        <DialogTitle> Login </DialogTitle>
        <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px" }}>
                <TextField
                    required placeholder="Username" label='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ width: '100%' }} />

                <TextField
                    required placeholder="Password" label='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ width: '100%' }} type='password' />

                <FormHelperText error={errorMessage}> {errorMessage}</FormHelperText>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={loginUser}> Login </Button>
            <Button onClick={closeModal}> Cancel </Button>
        </DialogActions>
    </Dialog>

}

export default LoginModal;