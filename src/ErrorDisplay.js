import { Box, Container, Stack, Typography } from "@mui/material";
import { useRouteError } from "react-router-dom"

const ErrorDisplay = ({ entity }) => {
    const error = useRouteError();

    return <Container>
        <Stack>
            <Typography> Desila se greska prilikom ucitavanja {entity} </Typography>
            <Typography> Da li ste pokrenuli back-end server? </Typography>
            <Typography> Interna greska je: </Typography>
            <Box>
                <pre>
                    {error.message}
                </pre>
            </Box>
        </Stack>
    </Container>
}

export default ErrorDisplay;