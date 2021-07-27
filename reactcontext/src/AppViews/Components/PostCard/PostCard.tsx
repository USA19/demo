import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Post } from "../../../Interfaces/Post";
// import { toTitleCase } from "../../../Utils/CamelCase";
import { baseUrl } from "../../../Context/BaseApi/server";
import Carousel from "react-material-ui-carousel"; //carousel
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: "30px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "blue",
  },
}));

type props = {
  posts: Post[];
};
export default function PostCard({ posts }: props) {
  const classes = useStyles();
  return (
    posts &&
    posts.length !== 0 && (
      <>
        {posts.map((post) => (
          <>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Avatar
                    aria-label="recipe"
                    className={classes.avatar}
                    src="./asa"
                  />
                }
                // title={toTitleCase(`${post.User.email}`)}
                title={`${post.User.email}`}
                subheader={
                  post.createdAt && new Date(post.createdAt).toDateString()
                }
              />
              {post.PostMedia && post.PostMedia.length !== 0 ? (
                <Carousel>
                  {post.PostMedia.map((media) => (
                    <CardMedia
                      className={classes.media}
                      image={baseUrl + media.mediaUrl}
                      title={post.description}
                    />
                  ))}
                </Carousel>
              ) : (
                ""
              )}

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.description}
                </Typography>
              </CardContent>
            </Card>
          </>
        ))}
      </>
    )
  );
}
