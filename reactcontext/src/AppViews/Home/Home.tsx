import React, { useContext, useEffect } from "react";
import { PostContext } from "../../Context/PostContext/PostContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import PostSomething from "./components/PostSomething";
import PostCard from "../Components/PostCard/PostCard";
// import useStyles from "./styles";

export default function Home() {
  const context = useContext(PostContext);
  console.log(context.posts); 
  useEffect(() => {
    context.fetchPosts();
  }, []);
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
    </Container>
  );
}
