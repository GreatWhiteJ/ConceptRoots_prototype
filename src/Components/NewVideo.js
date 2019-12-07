import React, { useState} from "react";
import { Dialog, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../firebase";

export default function NewVideo(props) {
  const [URL, setURL] = useState("");
  const [YouTubeID, setYouTubeID] = useState("");
  


  const handleSaveVideo = () => {
     db.collection("Explanations")
       .add({ URL: URL,
          YouTubeID: YouTubeID,
          ParentID:props.rootID,
          User: props.user.uid
        });
     props.onClose();

  };


  return (
    
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle> {"Paste in a YouTube URL"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Example: https://www.youtube.com/watch?v=GWwnNnlToL0"
          fullWidth
          value={URL}
          onChange={e => {
            setURL(e.target.value)
            setYouTubeID(e.target.value.substring(e.target.value.indexOf("=") + 1))
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={props.onClose}>
          cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          autoFocus
          onClick={handleSaveVideo}
        >
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}