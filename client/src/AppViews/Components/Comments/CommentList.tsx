import React, { useState } from "react";
//
import { makeStyles } from "@material-ui/core/styles";
import { commentInterface } from "../../../Interfaces/Post";
import PostCommentTextbar from "./CommentTextbar";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import SignleComment from "./SingleComment";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
}));
type Iprop = {
  Comments: commentInterface[];
  postId: number;
};
export default function AlignItemsList({ Comments, postId }: Iprop) {
  const classes = useStyles();
  const [showReply, setShowReply] = useState(false);
  const [rootId, setRootId] = useState<number | null>(null);
  return (
    <List className={classes.root}>
      {Comments &&
        Comments.length !== 0 &&
        Comments.map((comment, i) =>
          !comment.CommentId ? (
            <>
              <SignleComment
                postId={postId}
                comment={comment}
                key={i}
                childComments={comment.Comments}
                showReply={showReply}
                setShowReply={setShowReply}
                rootId={rootId}
                setRootId={setRootId}
              />
              {showReply ? (
                // here using it as reply so there will be a CommentId
                <Box style={{ marginLeft: "40px", marginTop: "10px" }} key={i}>
                  <PostCommentTextbar postId={postId} CommentId={rootId} />
                </Box>
              ) : (
                ""
              )}
            </>
          ) : (
            ""
          )
        )}
    </List>
  );
}
