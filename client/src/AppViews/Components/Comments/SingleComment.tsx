import { commentInterface } from "../../../Interfaces/Post";
import React from "react";
// ,{useState}
// import PostCommentTextbar from "./CommentTextbar";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
// import { Comment, Avatar } from "antd";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  replyText: {
    textDecoration: "underline",
    fontSize: "12px",

    marginLeft: "70px",
  },
  replyContainer: {
    marginLeft: "40px",
    marginTop: "10px",
  },
}));

type Iprop = {
  postId: number;
  comment: commentInterface;
  childComments: commentInterface[];
  setShowReply: (value: React.SetStateAction<boolean>) => void;
  setRootId: (value: React.SetStateAction<number>) => void;
  rootId: number;
  showReply: boolean;
};
function SingleComment({
  postId,
  comment,
  childComments,
  showReply,
  setShowReply,
  rootId,
  setRootId,
}: Iprop) {
  const classes = useStyles();

  // const [showReply, setShowReply] = useState(false);
  // const [rootId, setRootId] = useState<number | null>(null);
  const handleShowReply = (id: number | null) => {
    console.log(id);
    setRootId(id);
    setShowReply(true);
  };
  //  const childComments = () => allComments.filter((c) => c.parent_id === comment.id);
  return (
    <>
      <ListItem alignItems="flex-start" button>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={comment && comment.User ? comment.User.email : ""}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {comment.comment}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <Typography
        component="span"
        onClick={() => handleShowReply(comment.id)}
        className={classes.replyText}
      >
        Reply
      </Typography>
      {/* ) : (
        ""
      )} */}
      {childComments &&
        childComments.length !== 0 &&
        childComments.map((c, i) => (
          <Box ml={i + 3}>
            <SingleComment
              key={c.id}
              comment={c}
              childComments={c.Comments}
              postId={c.PostId}
              showReply={showReply}
              setShowReply={setShowReply}
              rootId={rootId}
              setRootId={setRootId}
            />
          </Box>
        ))}
      {/* </Comment> */}

      {/* {showReply ? (
        // here using it as reply so there will be a CommentId
        <Box className={classes.replyContainer}>
          <PostCommentTextbar postId={postId} CommentId={rootId} />
        </Box>
      ) : (
        ""
      )} */}
    </>
  );
}

export default SingleComment;
