import React, { } from "react";
import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../firebase";

export default function DeleteVideo(props) {

  
//  const handleDeleteVideo = task_id => {
//     db.collection("Explanation")
//       .doc(props.videoID)
//       .delete();
//   };

  const handleDeleteVideo = () => {
      db.collection("Explanations")
       .doc(props.videoID)
       .delete();
     props.onClose();

  };

  // const handleDeleteVideo = () => {
  //     db.collection("Explanations")
  //      .doc(props.videoID)
  //      .update({ 
  //       // Deleted: true,
  //       //DeletedBy: props.user.uid
  //       });
  //    props.onClose();

  // };


  return (
    
    <Dialog open={props.open} onClose={props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle> {"Are you sure you want to continue?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do not delete this video unless you are sure it does not belong
        </DialogContentText>

      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={props.onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          autoFocus
          onClick={handleDeleteVideo}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}