import AudioAnalyser from "react-audio-analyser";
import React, { useState, useEffect } from "react";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import { makeStyles } from "@material-ui/core/styles";
import { useRecoilState } from "recoil";
import { AUDIO_BLOB } from "../store";
import "../styles/AudioRecorder.css";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-start",
    marginBottom: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  wrapIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
  },
}));

//hook for recording
const Recorder = (props) => {
  const [status, setStatus] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [duration, setDuration] = useState(0);
  const [placeholder, setPlaceholder] = useState("0");
  const [audio, setAudio] = useState(undefined);
  const controlAudio = (status) => {
    setStatus(status);
  };
  console.log("rendered");
  useEffect(() => {
    if (duration > 180) {
      controlAudio("inactive");
    }
    if (Math.floor((duration % 60) / 10) > 0) {
      setPlaceholder("");
    } else {
      setPlaceholder("0");
    }
  }, [duration]);

  const classes = useStyles();
  const audioProps = {
    audioType: "audio/wav",
    // audioOptions: { sampleRate: 3000 },
    status,
    audioSrc,
    timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
    startCallback: (e) => {
      console.log("start", e);
    },
    pauseCallback: (e) => {
      console.log("pause", e);
    },
    stopCallback: (e) => {
      setAudioSrc(window.URL.createObjectURL(e));
      setAudio(e);
      props.setAudio(props.index, e);
      console.log("Duration", duration);
      setDuration(0);
      console.log("stop", e);
    },
    onRecordCallback: (e) => {
      console.log("recording", e);
      setDuration(duration + 1);
    },
    errorCallback: (err) => {
      console.log("error", err);
    },
  };
  
  return (
    <div class="audiorecorder-wrapper">
      <div className={classes.buttons} class="btn-wrapper">

        {status !== "recording" && (
          <div
            onClick={() => controlAudio("recording")}
            variant="contained"
            color="primary"
            class="audiorecorder-btn"
          >
            <PlayArrowIcon/>
            <div class="iconbreak"/>
            {duration === 0
              ? (status==="inactive" ? "RESTART " : "START ")
              : "RESUME " +
                Math.floor(duration / 60) +
                ":" +
                placeholder +
                (duration % 60)}
          </div>
        )}

        {status === "recording" && (
          <div
            onClick={() => controlAudio("paused")}
            variant="contained"
            color="secondary"
            class="audiorecorder-btn"
          >
            <PauseIcon />
            {"PAUSE " +
              Math.floor(duration / 60) +
              ":" +
              placeholder +
              (duration % 60)}
          </div>
        )}

        <div
          onClick={() => controlAudio("inactive")}
          variant="contained"
          color="primary"
          class="audiorecorder-btn"
        >
          <StopIcon />
          STOP
        </div>
      </div>

      <AudioAnalyser
        {...audioProps}
        width={100}
        height={100}
        backgroundColor="#6287F7"
        strokeColor="#EFF2FC"
        className="audioanalyser"
      ></AudioAnalyser>
    </div>
  );
};

export default Recorder;
