import React, { useContext, useEffect, useState } from "react";
import { PostContext } from "../../Context/PostContext/PostContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PostSomething from "./components/PostSomething";
import PostCard from "../Components/PostCard/PostCard";
import PaginationComponent from "../../Components/Pagination";
// import useStyles from "./styles";

const Home = ():JSX.Element => {
  const context = useContext(PostContext);
  const [page, setPage] = useState<string>("1");
  const [limit] = useState<string>("10");
  useEffect(() => {
    context.fetchPosts(page, limit);
  }, [page]);
  return (
    <Container maxWidth="sm" style={{ marginTop: 20 }}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item sm={12}>
          <Box mt={3} mb={3}>
            <PostSomething />
          </Box>
          <PostCard posts={context.posts} />
        </Grid>
      </Grid>
      <PaginationComponent setPage={setPage} />
    </Container>
  );
};

export default Home;
