import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Tooltip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

const ShowSubject = ({ subject, onDelete }) => {
  const navigate = useNavigate();

  const deleteSubject = async () => {
    let response = await fetch(`http://localhost:8080/api/v1/skolskidnevnik/subject/${subject.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      let d = await response.json();
      console.log('Uspesno obrisan predmet');
      onDelete(subject.id);
    } else {
      console.log('Greska priikom brisanja');
    }
  }

  return <Grid item xs={12} md={6} lg={4}>
    <Card variant="outlined">
      <CardHeader
        sx={{ display: "flex", textAlign: "center" }}
        title={subject.name}
      />
      <CardMedia
        sx={{ height: 140 }}
        image="https://images.theconversation.com/files/49135/original/22qc7r28-1400667334.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip"
        title={subject.hours}
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >

        <Grid container spacing={3} alignItems='center' justifyContent='space-between' sx={{ padding: '5px' }}>
          <Grid item xs={6} >
            Name:
          </Grid>
          <Grid item xs={6}>
            {subject.name}
          </Grid>
          <Grid item xs={6} >
            Hours:
          </Grid>
          <Grid item xs={6}>
            {subject.hours}
          </Grid>
        </Grid>
      </CardContent>

      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        <Tooltip title="Info">
          <IconButton
            aria-label="info"
            onClick={() => navigate(`subject/${subject.id}`)}
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit">
          <IconButton aria-label="edit" onClick={() => navigate(`edit_subject/${subject.id}`)}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteSubject}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  </Grid>
}

export default ShowSubject;