import { Card, CardContent, CardHeader, CardMedia, Container, Grid } from "@mui/material";
import { useLoaderData } from "react-router-dom";

const TeacherDetails = () => {
    const teacher = useLoaderData();

    return <Container>
        <Card sx={{ marginBottom: 3 }} variant="outlined">
            <CardHeader
                sx={{ display: "flex", textAlign: "center" }}
                title={teacher.name}
            />
            <CardMedia
                sx={{ height: 400 }}
                image="https://img.freepik.com/free-vector/teacher-standing-near-blackboard-holding-stick-isolated-flat-vector-illustration-cartoon-woman-character-near-chalkboard-pointing-alphabet_74855-8600.jpg"
                title={teacher.name}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Grid container spacing={3} direction='row' alignItems='center' justifyContent='center' sx={{ padding: '5px', maxWidth: '50%' }}>
                    <Grid item xs={6}>
                        Name:
                    </Grid>
                    <Grid item xs={6}>
                        {teacher.name}
                    </Grid>
                    <Grid item xs={6} >
                        Last name:
                    </Grid>
                    <Grid item xs={6}>
                        {teacher.lastName}
                    </Grid>
                    <Grid item xs={6} >
                        Email:
                    </Grid>
                    <Grid item xs={6}>
                        {teacher.email}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Container>
}

export default TeacherDetails;