import "../styles/AnswerBox.css";
import { React, useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useOnlineAnswering } from "online-answering";
import Switch from "react-switch";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import MicOff from "@material-ui/icons/MicOff";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import CloseIcon from "@material-ui/icons/Close";
import { useRecoilState, useRecoilValue } from "recoil";
import { AUTHTOKEN, PROFILE, URLS, SOCKET } from "../store";
import { useAlert } from "react-alert";
import { Tooltip } from "react-tippy";
import axios from "axios";

// Switch that toggles voice buzzin
const VoiceBuzzSwitch = (props) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    props.setVoice(nextChecked);
  };

  return (
    <div>
      <label class="answerbox-toggle-wrapper">
        <Switch
          onChange={handleChange}
          checked={checked}
          className={"answerbox-toggle-content"}
          checkedIcon={
            <MicIcon
              style={{
                color: "white",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
              }}
            />
          }
          uncheckedIcon={
            <MicOffIcon
              style={{
                color: "white",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
              }}
            />
          }
        />
      </label>
    </div>
  );
};

// switch that toggles the classifier
const UseClassifierSwitch = (props) => {
  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    props.setVoice(nextChecked);
  };

  return (
    <div>
      <label class="answerbox-toggle-wrapper-2">
        <Switch
          onChange={handleChange}
          checked={checked}
          className={"answerbox-toggle-content-2"}
          checkedIcon={
            <DoneOutlineIcon
              style={{
                color: "white",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
              }}
            />
          }
          uncheckedIcon={
            <CloseIcon
              style={{
                color: "white",
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
              }}
            />
          }
        />
      </label>
    </div>
  );
};

// Legacy function that enables you to store previous state values
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// Hook for the answer box at the bottom of all games
function AnswerBox(props) {
  const profile = useRecoilValue(PROFILE);
  const username = profile["username"];
  const urls = useRecoilValue(URLS);
  const authtoken = useRecoilValue(AUTHTOKEN);
  const alert = useAlert();
  const socket = useRecoilValue(SOCKET);

  const [ready, setReady] = useState(false);
  const [useClassifier, setUseClassifier] = useState(false);
  const prevQuestionTime = usePrevious(props.questionTime);

  // ASR always picks up the wake word, this function removes it
  function complete(answer) {
    props.setAnswer(answer.substr(answer.indexOf(" ") + 1).replace("stop", ""));
  }

  // Sets answer when typed
  function setAnswer2(event) {
    props.setAnswer(event.target.value);
  }

  function buzzin() {
    props.buzz();
  }

  function submit() {
    props.submit(props.answer);
    props.setAnswer("");
  }

  const [
    answer,
    listening,
    browserSupportsSpeechRecognition,
    recordingStatus,
    timeLeft,
  ] = useOnlineAnswering({
    audio: {
      buzzin:
        "https://assets.mixkit.co/sfx/download/mixkit-game-show-wrong-answer-buzz-950.wav",
      buzzout:
        "https://assets.mixkit.co/sfx/download/mixkit-game-show-wrong-answer-buzz-950.wav",
    },
    onAudioData: () => {},
    timeout: 6000,
    isReady: ready,
    onComplete: async (answer, blob) => {
      if (useClassifier) {
        const formdata = new FormData();
        formdata.append("audio", blob);
        formdata.append("auth", authtoken);

        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "test.wav";
        document.body.appendChild(a);
        a.click();

        const config = {
          headers: { "content-type": "multipart/form-data" },
        };

        //POST TO CLASSIFIER SERVER
        const response = await axios
          .post(urls["socket_flask"] + "/audioanswerupload", formdata, config)
          .then((response) => {
            console.log(response);
            socket.emit("audioanswer", {
              auth: authtoken,
              filename: response.data["filename"], // CHANGE
            });
          })
          .catch((error) => {
            alert.error("Classification submission failed");
          });
      } else {
        complete(answer);
      }
    },
    onBuzzin: () => buzzin(),
  });

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  useEffect(() => {
    if(props.buzzer !== username) {
      props.setAnswer("");
    }
  }, [props.buzzer])

  return (
    <div class="answerbox-answering-wrapper">
      <form class="answerbox-textbox">
        <label>
          <input
            disabled={props.buzzer !== username}
            type="text"
            name="name"
            value={props.answer}
            onChange={setAnswer2}
            className={"answerbox-textbox-text"}
          />
        </label>
      </form>
      <div class="answerbox-switch-wrapper">
        <Tooltip
          // options
          title="Use voice commands"
          position="top"
          trigger="mouseenter"
          unmountHTMLWhenHide="true"
        >
          <VoiceBuzzSwitch setVoice={setReady} />
        </Tooltip>
        {ready && props.classifiable && (
          <div>
            <Tooltip
              // options
              title="Use classifier"
              position="top"
              trigger="mouseenter"
              unmountHTMLWhenHide="true"
            >
              <UseClassifierSwitch setVoice={setUseClassifier} />
            </Tooltip>
          </div>
        )}
      </div>

      <div class="answerbox-button" onClick={buzzin}>
        Buzz
      </div>
      <div class="answerbox-button" onClick={submit}>
        Submit
      </div>
    </div>
  );
}

export default AnswerBox;
