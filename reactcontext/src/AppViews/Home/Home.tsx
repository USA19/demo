import React from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  // Grid,
  Container,
  Box,
} from "@material-ui/core";
import useStyles from "./styles";

export default function Home() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      {/* <Grid container justifyContent="center" alignItems="center"> */}
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
        >
          <Box mt={3} mb={2}>
            <Typography variant="h6" className={classes.title}>
              Creating a Post
            </Typography>
          </Box>
          <Box mt={3} mb={3}>
            <label htmlFor="icon-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
            />
          </Box>
          <TextField
            name="description"
            variant="outlined"
            label="What is in your mind"
            fullWidth
            multiline
            rows={4}
          />

          <div className={classes.fileInput}></div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Paper>
      {/* </Grid> */}
    </Container>
  );
}
