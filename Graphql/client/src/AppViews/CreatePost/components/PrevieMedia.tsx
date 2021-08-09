import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
interface PreviewMedediaProps {
  urls: FileList | null;
  setUrls: React.Dispatch<React.SetStateAction<FileList>>;
};
const PreviewMededia=({ urls, setUrls }: PreviewMedediaProps): JSX.Element=> {
  const classes = useStyles();

  const handleDeleteImage = (key) => {
    const list = { ...urls };
    delete list[key];
    // list.splice(index, 1);
    setUrls(list);
  };
  return (
    urls && (
      <Box>
        {Object.keys(urls).length !== 0 &&
          Object.keys(urls).map((key, i) => {
            return (
              <Card className={classes.root} key={i}>
                <CardMedia
                  className={classes.media}
                  image={URL.createObjectURL(urls[key])}
                />
                <IconButton
                  onClick={() => handleDeleteImage(key)}
                  className={classes.close}
                >
                  <HighlightOffIcon />
                </IconButton>
              </Card>
            );
          })}
      </Box>
    )
  );
}


export default PreviewMededia
