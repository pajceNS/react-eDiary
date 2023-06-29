import { Card, CardContent, CardHeader, CardMedia, Container, Grid } from "@mui/material";
import { useLoaderData } from "react-router-dom";

const SubjectDetails = () => {
  const subject = useLoaderData();

  return <Container>
    <Card sx={{ marginBottom: 3 }} variant="outlined">
      <CardHeader
        sx={{ display: "flex", textAlign: "center" }}
        title={subject.name}
      />
      <CardMedia
        sx={{ height: 400 }}
        image="https://images.theconversation.com/files/49135/original/22qc7r28-1400667334.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
        title={subject.name}
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
            Name
          </Grid>
          <Grid item xs={6}>
            {subject.name}
          </Grid>
          <Grid item xs={6} >
            Hours
          </Grid>
          <Grid item xs={6}>
            {subject.hours}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Container>
}

export default SubjectDetails;