import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { uploadedMedia } from "../../../Interfaces/Post";

import { baseUrl } from "../../../Context/BaseApi/server";
import { PostContext } from "../../../Context/PostContext/PostContext";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: "10px",
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  close: {
    position: "absolute",
    top: 0,
    right: 0,
  },
}));
type props = {
  urls: FileList;
  setUrls: React.Dispatch<React.SetStateAction<FileList>>;
  setUploadeMedia: React.Dispatch<React.SetStateAction<uploadedMedia[]>>;
  uploadeMedia: uploadedMedia[];
  postId: number | null;
};
export default function PreviewMededia({
  urls,
  setUrls,
  setUploadeMedia,
  uploadeMedia,
  postId,
}: props): JSX.Element {
  const { deletePostImage } = useContext(PostContext);
  const classes = useStyles();
  const handleUploadedDeleteImage = (index: number, imageId: number) => {
    console.log(postId);
    deletePostImage(postId, imageId);
    const list = [...uploadeMedia];
    list.splice(index, 1);
    setUploadeMedia(list);
  };

  const handleDeleteImage = (key) => {
    const list = { ...urls };
    delete list[key];

    setUrls(list);
  };
  return (
    <>
      {uploadeMedia.length !== 0 && (
        <Box>
          {uploadeMedia.map((url, i) => {
            return (
              <Card className={classes.root} key={i}>
                <CardMedia
                  className={classes.media}
                  image={`${baseUrl}${url.mediaUrl}`}
                />
                <IconButton
                  onClick={() => handleUploadedDeleteImage(i, url.id)}
                  className={classes.close}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Card>
            );
          })}
        </Box>
      )}
      {urls && (
        <Box>
          {Object.keys(urls).map((key, i) => {
            return (
              <Card className={classes.root} key={i}>
                <CardMedia
                  className={classes.media}
                  image={URL.createObjectURL(urls[key])}
                />
                <IconButton
                  onClick={() => handleDeleteImage(i)}
                  className={classes.close}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Card>
            );
          })}
        </Box>
      )}
    </>
  );
}