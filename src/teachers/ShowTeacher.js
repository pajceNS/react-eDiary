import { Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";

const ShowTeacher = ({ teacher, onDelete }) => {
  const navigate = useNavigate();

  const deleteTeacher = async () => {
    let response = await fetch(`http://localhost:8080/api/v1/skolskidnevnik/user/admin/teacher/${teacher.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      let d = await response.json();
      console.log('uspesno obrisan nastavnik');
      onDelete(teacher.id);
    } else {
      console.log('greska priikom brisanja');
    }
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card variant="outlined">
        <CardHeader
          name={teacher.name}
          sx={{ display: "flex", textAlign: "center" }}
        />
        <CardMedia
          sx={{ height: 160 }}
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
          <Grid container spacing={3} alignItems='center' justifyContent='space-between' sx={{ padding: '5px' }}>
            <Grid item xs={6} >
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

        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tooltip title="Info">
            <IconButton
              aria-label="info"
              onClick={() => navigate(`teacher/${teacher.id}`)}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton aria-label="edit" onClick={() => navigate(`edit_teacher/${teacher.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={deleteTeacher}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ShowTeacher;