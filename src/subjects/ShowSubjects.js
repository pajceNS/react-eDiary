import { useLoaderData, useNavigate } from "react-router-dom";
import ShowSubject from "./ShowSubject";
import { useState } from "react";
import { Box, Button, Container, FormControl, Grid, InputLabel, TextField, InputAdornment } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const ShowSubjects = () => {
  const subjects = useLoaderData();
  const [showSubjects, setShowSubjects] = useState(subjects);
  const navigate = useNavigate();

  const handleDelete = (subjectId) => {
    const fb = showSubjects.filter((b) => b.id != subjectId);
    setShowSubjects(fb);
  }

  const search = (value) => {
    if (value == '') {
      setShowSubjects(subjects)
    } else {
      const s = subjects.filter(s => s.name.toLowerCase().includes(value.toLowerCase()))
      setShowSubjects(s);
    }
  }

  return <Container>
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 3,
      }}
    >
      <FormControl sx={{ width: '30%' }}>
        <InputLabel id="demo-select-small-label"></InputLabel>
        <TextField
          placeholder="Search..."
          label="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => search(e.target.value)}
        />
      </FormControl>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => navigate("new_subjects")}>
        Add new subject
      </Button>
    </Box>
    <Grid container spacing={3}>
      {showSubjects.map((s) => (
        <ShowSubject subject={s} onDelete={handleDelete} />
      ))}
    </Grid>
  </Container>
}

export default ShowSubjects;