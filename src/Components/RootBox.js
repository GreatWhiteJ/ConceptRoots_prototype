import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { db } from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import NewVideo from "./NewVideo";
import DeleteVideo from "./DeleteVideo";
import YouTube from "react-youtube";
import axios from "axios";
import parseString from "xml2js";
//import './Transcriptor.js'

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "verticle",
    width: "100%",
    height: "100%"
  },
  bottom: {
    top: "auto",
    bottom: 0
  },
  sticky: {
    position: "-webkit-sticky" /* Safari */,
    position: "sticky",
    top: 70
  }
}));

const opts = {
  height: "390",
  width: "640"
};

export function RootBox(props) {
  const classes = useStyles();
  const [expls, setExpls] = useState([]);
  const [videoID, setVideoID] = useState();
  const [description, setDescription] = useState();
  const [dialog_open, setDialogOpen] = useState(false);
  const [delete_open, setDeleteOpen] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [href, setHref] = useState("");
  const [player, setPlayer] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    let refresh;
    refresh = db
      .collection("Roots")
      .doc(props.match.params.rootID)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        setDescription(data.Description);
      });
    return refresh;
  }, [props.match.params]);

  useEffect(() => {
    let refresh;
    refresh = db
      .collection("Explanations")
      .where("ParentID", "==", props.match.params.rootID)
      .onSnapshot(snapshot => {
        const updated_expls = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          updated_expls.push({
            ID: doc.id,
            ParentID: data.ParentID,
            URL: data.URL,
            YouTubeID: data.YouTubeID
          });
        });
        setExpls(updated_expls);
        // axios.get(href).then(res => {
        //   var xml = new XMLParser().parseFromString(res.data);
        //   setTransObject(xml);
        // });
        tryFetchTranscript();
        //setVideoID(updated_expls[0].YouTubeID);
      });
    return refresh;
  }, [props.match.params, href]);

  useEffect(() => {
    let refresh;
    refresh = db
      .collection("Explanations")
      .where("ParentID", "==", props.match.params.rootID)
      .onSnapshot(snapshot => {
        const updated_expls = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          updated_expls.push({
            ID: doc.id,
            ParentID: data.ParentID,
            URL: data.URL,
            YouTubeID: data.YouTubeID
          });
        });

        setVideoID(updated_expls[0].YouTubeID);
      });
    return refresh;
  }, [props.match.params]);

  useEffect(() => {
    setHref("https://video.google.com/timedtext?v=" + videoID + "&lang=en");
  }, [videoID]);

  const tryFetchTranscript = () => {
    return new Promise((resolve, reject) => {
      axios.get(href).then(response => {
        if (!response.data) {
          console.log("NO TRANSCRIPT AVAILABLE");
          setTranscript([]);
          resolve(false);
        } else {
          // HANDLE TRANSCIRPT
          console.log("PARSING TRASNSCRIPT XML");
          parseString.parseString(response.data, (err, result) => {
            if (err) {
              console.log(err);
            }
            for (let i = 0; i < result.transcript.text.length; i++) {
              result.transcript.text[i].active = false;
            }
            setTranscript(result.transcript.text);
            resolve(true);
          });
        }
      });
    });
  };

  return (
    <div
      className={classes.root}
      style={{
        flexWrap: "wrap",
        width: "100%",
        height: "100%",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "100%"
        }}
      >
        <Paper style={{ width: 400, marginTop: 40, padding: 10 }}>
          {description}
        </Paper>
      </div>
      <div
        className={classes.root}
        style={{
          justifyContent: "center",
          flexWrap: "wrap"
        }}
      >
        <div
          className={classes.sticky}
          style={{
            height: 410,
            margin: 40
          }}
        >
          <div
            className={classes.sticky}
            id={videoID}
            style={{
              display: "flex",
              height: 390,
              width: 640,
              //backgroundColor: 'white',
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "vertical"
            }}
          >
            <YouTube
              videoId={videoID}
              opts={opts}
              onReady={event => {
                event.target.playVideo();
                event.target.seekTo(10);
                setPlayer(event.target);
              }}
            />
          </div>
          <Button color="primary" variant="contained" style={{ marginTop: 10 }}>
            <a
              href="#vidMenue"
              style={{ textDecoration: "none", color: "white" }}
            >
              Jump to additional explanations
            </a>
          </Button>
        </div>
        <Paper
          style={{
            width: 500,
            margin: 40,
            padding: 10
            //height: 800
          }}
        >
          {/* _onReady(event) {
            // access to player in all event handlers via event.target
            event.target.pauseVideo();
          } */}
          <div id={"videoTranscript" + videoID}>
            {transcript.map(value => {
              return (
                <span
                  onClick={() => {
                    player.seekTo(value.$.start);
                    //this next line is the problem. Event doesn't mean anything in this context
                    //(event)=>{event.target.seekTo(value.$.start)})
                  }}
                >
                  {value._ + " "}
                </span>
              );
            })}
          </div>
        </Paper>
      </div>
      <div
        className={classes.bottom}
        id="vidMenue"
        style={{
          display: "flex",
          width: "100%",
          // backgroundColor: "gray",
          padding: 30,
          justifyContent: "space-around",
          height: 100,
          marginTop: 10
        }}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Add Video
        </Button>
        {expls.map(value => {
          return (
            <ListItem
              key={value.id}
              role={undefined}
              dense
              button
              onClick={() => {
                setVideoID(value.YouTubeID);
                //setHref("https://video.google.com/timedtext?v="+value.YouTubeID+"&lang=en")
              }}
            >
              <img
                src={"https://img.youtube.com/vi/" + value.YouTubeID + "/1.jpg"}
                alt="Girl in a jacket"
              />
            </ListItem>
          );
        })}
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            setDeleteOpen(true);
          }}
        >
          Delete Current Video
        </Button>
      </div>
      <NewVideo
        open={dialog_open}
        user={props.user}
        rootID={props.match.params.rootID}
        onClose={() => {
          setDialogOpen(false);
        }}
      />
      <DeleteVideo
        open={delete_open}
        user={props.user}
        rootID={props.match.params.rootID}
        videoID={videoID}
        onClose={() => {
          setDeleteOpen(false);
        }}
      />
    </div>
  );
}
