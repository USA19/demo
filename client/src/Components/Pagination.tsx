import React, { useContext } from "react";

import { PostContext } from "../Context/PostContext/PostContext";

import Pagination from "@material-ui/lab/Pagination";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

type Iprop = {
  setPage: React.Dispatch<React.SetStateAction<string>>;
};
export default function BasicPagination({ setPage }: Iprop) {
  // const classes = useStyles();
  const { totalPostPages } = useContext(PostContext);
  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <Container maxWidth="sm">
      {totalPostPages > 1 && (
        <Grid container direction="row" justify="center" alignItems="center">
          <Pagination
            count={totalPostPages}
            color="primary"
            style={{ marginTop: "30px", marginBottom: "50px" }}
            onChange={handleChange}
          />
        </Grid>
      )}
    </Container>
  );
}
