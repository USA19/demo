import React, { useState ,useContext} from "react";
import CreatePost from "../../CreatePost/components/CreatePost";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";
import { baseUrl } from "../../../Context/BaseApi/server";


import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
    justifyContent: "center",
    textAlign: "center",
    height: "90px",

    padding: "15px",
  },
  sharePost: {
    borderRadius: "50px",
    backgroundColor: "#E4E6E9",
    padding: "8px",
  },
  avatar: {
    backgroundColor: "blue",
  },
}));
const PostSomething = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const {user}=useContext(AuthContext)
  return (
    <Box className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={2} sm={1}>
          <Avatar
            src={
              user && user.profileImageUrl
                ? baseUrl + user.profileImageUrl
                : "/ssa"
            }
            style={{ marginTop: "3px" }}
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={10} sm={11}>
          <InputBase
            className={classes.sharePost}
            placeholder="What is on your mind?"
            inputProps={{ "aria-label": "naked" }}
            fullWidth
            disabled
            onClick={() => setOpen(true)}
          />
        </Grid>
        <CreatePost open={open} setOpen={setOpen} />
      </Grid>
    </Box>
  );
};

export default PostSomething;
