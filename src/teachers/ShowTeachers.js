import { useLoaderData, useNavigate } from "react-router-dom";
import ShowTeacher from "./ShowTeacher";
import { Box, Button, Container, FormControl, InputLabel, Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

const ShowTeachers = () => {
  const teachers = useLoaderData();
  const navigation = useNavigate();
  const [showTeachers, setShowTeachers] = useState(teachers);

  const search = (value) => {
    if (value == '') {
      setShowTeachers(teachers)
    } else {
      const t = teachers.filter(t => t.name.toLowerCase().includes(value.toLowerCase()) || t.lastName.toLowerCase().includes(value.toLowerCase()))
      setShowTeachers(t);
    }
  }

  return (
    <Container>
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
          onClick={() => navigation("new_teacher")}>
          Add new Teacher
        </Button>
      </Box>
      <Grid container spacing={3}>
        {showTeachers.map(a =>
          <ShowTeacher
            teacher={a}
            onDelete={(teacherId) => {
              const list = teachers.filter((t) => t.id != teacherId);
              setShowTeachers(list);
            }}
          />
        )}
      </Grid>
    </Container>
  );
}

export default ShowTeachers;