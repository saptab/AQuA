import "../styles/Play.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { JOIN_CUSTOM_LOBBY_SCREEN, USERNAME, SOCKET, LOBBY_CODE, PLAY_SCREEN, GAMESETTINGS, PLAYERS, SCREEN, AUTHTOKEN } from "../store";
import { useEffect } from "react";
import { useAlert } from 'react-alert'


// ASSETS
import GamemodeIcon1 from '../assets/gamemode-icon-1.svg';
import GamemodeIcon2 from '../assets/gamemode-icon-2.svg';
import GamemodeIcon3 from '../assets/gamemode-icon-3.svg';
import GamemodeIcon4 from '../assets/gamemode-icon-4.svg';
import GamemodeIcon5 from '../assets/gamemode-icon-5.svg';
import GamemodeIcon6 from '../assets/gamemode-icon-6.svg';
import GamemodeIcon7 from '../assets/gamemode-icon-7.svg';


// class for gamesettings object
class gameSettings {
    
    constructor({
        title = "Practice",
        description = "A solo gamemode designed for individual practice.",
        cost = "1 energy per question",
        maxPlayers = "1",
        teams = "1",
        timeBetweenQuestions = "5s",
        buzzTimeAfterQuestions = "5s",
        topics = "All",
        rounds = "1",
        questionsPerRound = "20",
        isTextDisabled = "No",
        tiebreaker = "None",
        gamemode = "solopractice"
    }) {
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.maxPlayers = maxPlayers;
        this.teams = teams;
        this.timeBetweenQuestions = timeBetweenQuestions;
        this.buzzTimeAfterQuestions = buzzTimeAfterQuestions;
        this.topics = topics;
        this.rounds = rounds;
        this.questionsPerRound = questionsPerRound;
        this.isTextDisabled = isTextDisabled;
        this.tiebreaker = tiebreaker;
        this.gamemode = gamemode;
    }
}

const gameSettingsList = [
    new gameSettings({}),
    new gameSettings({ // gamemode = 1 (ranked 1v1)
        title: "Ranked 1v1",
        description: "Compete against other players to climb the ladder and earn rating!",
        cost: "10 energy per game",
        maxPlayers: "2",
        teams: "2",
        timeBetweenQuestions: "5s",
        buzzTimeAfterQuestions: "5s",
        topics: "All",
        rounds: "3",
        questionsPerRound: "5",
        isTextDisabled: "No",
        tiebreaker: "Tiebreaker question"
    }),
    new gameSettings({ // gamemode = 2 (ranked 2v2)
        title: "Ranked 2v2",
        description: "Compete against other players in teams of 2 to climb the ladder and earn rating!",
        cost: "10 energy per game",
        maxPlayers: "4",
        teams: "2",
        timeBetweenQuestions: "5s",
        buzzTimeAfterQuestions: "5s",
        topics: "All",
        rounds: "3",
        questionsPerRound: "5",
        isTextDisabled: "Yes",
        tiebreaker: "Tiebreaker question"
    }),
    new gameSettings({ // gamemode = 3 (1v1 casual)
        title: "1v1",
        description: "Queue up to play casual 1v1 against others!",
        cost: "10 energy per player per game",
        maxPlayers: "2",
        teams: "2",
        timeBetweenQuestions: "5s",
        buzzTimeAfterQuestions: "5s",
        topics: "All",
        rounds: "3",
        questionsPerRound: "5",
        isTextDisabled: "Yes",
        tiebreaker: "Tiebreaker question"
    }),
    new gameSettings({ // gamemode = 4 (4v4 custom)
        title: "Casual 4v4",
        description: "Preset to play a full 20-30 minute game against friends in a casual 4v4 (all settings can be modified in the lobby)",
        cost: "40 energy per player per game",
        maxPlayers: "8",
        teams: "2",
        timeBetweenQuestions: "5s",
        buzzTimeAfterQuestions: "5s",
        topics: "All",
        rounds: "3",
        questionsPerRound: "25",
        isTextDisabled: "No",
        tiebreaker: "Tiebreaker question"
    }),
    new gameSettings({ // gamemode = 5 (Custom)
        title: "Custom Lobby",
        description: "Play with friends in a completely custom lobby!",
        cost: "Varies",
        maxPlayers: "2-8",
        teams: "2-4",
        timeBetweenQuestions: "0-60s",
        buzzTimeAfterQuestions: "0-20s",
        topics: "All",
        rounds: "1-7",
        questionsPerRound: "1-30",
        isTextDisabled: "No",
        tiebreaker: "Tiebreaker question",
        gamemode: "customclassic"
    }),
];

// button for starting the lobby
function StartLobbyButton(props) {
    const [socket, setSocket] = useRecoilState(SOCKET);
    const [lobbyCode, setLobbyCode] = useRecoilState(LOBBY_CODE);
    const [playScreen, setPlayScreen] = useRecoilState(PLAY_SCREEN);
    const [gameSettings, setGameSettings] = useRecoilState(GAMESETTINGS);
    const authtoken = useRecoilValue(AUTHTOKEN);


    useEffect(() => {
        const lobbyStateListener = (data) => {
            setGameSettings({
                'players': data['players'],
                'teams': data['teams'],
                'max_players': data['max_players'],
                'rounds': data['rounds'],
                'questions_num': data['questions_num'],
                'gap_time': data['gap_time'],
                'post_buzz_time': data['post_buzz_time'],
            });
            setLobbyCode(data['code']);
            setPlayScreen(1);
        };

        socket.on("lobbystate", lobbyStateListener);

        return function cleanSockets() {
            socket.off("lobbystate", lobbyStateListener);
        }
    });

    function StartLobby() {
        setPlayScreen()
        socket.emit("startlobby", {
            auth: authtoken,
            gamemode: props.gamemode,
        });
    }

    return (
        <div class="play-gamemodecard-start play-hvr-grow" onClick={StartLobby}>
            START
        </div>
    )
}

// name = display name, gamemode = gamemode state, layer = layer of button, self = which button on the layer is it
function GamemodeBtn(props) {
    function setGamemodeHandler() {
        props.setGamemode(props.self);
    }
    
    return (
        <div className={"play-gamemode-btn " + (props.gamemode === props.self ? "play-gamemode-btn-selected" : "")} onClick={ () => {
            document.location.hash = props.self;
            props.setGamemode(props.self);
        }}>
            {props.name}
        </div>
    );
}

// card for a gamemode that is coming soon
function GamemodeComingSoonCard(props) {
    const alert = useAlert();

    function alertComingSoon() {
        alert.show("This gamemode is coming soon!");
    }

    return (
        <div class="play-gamemodecard-comingsoon-wrapper" onClick={alertComingSoon}>
            <div class="play-gamemodecard-pfp" style={{ backgroundImage: `url(${props.icon})` }}></div>
            <div class="play-gamemodecard-comingsoon-title">
                Coming Soon!
            </div>
        </div>
    );
}

// card for a gamemode
function GamemodeCard(props) {
    return (
        <div class="play-gamemodecard-wrapper">
            <div class="play-gamemodecard-pfp" style={{ backgroundImage: `url(${props.icon})` }}></div>
            <div class="play-gamemodecard-title">
                {props.gamesettings.title}
            </div>
            <div class="play-gamemodecard-description">
                {props.gamesettings.description}
            </div>
            <StartLobbyButton gamemode={props.gamesettings.gamemode}/>
        </div>
    );
}

// card for joining a custom lobby
function JoinCustomLobbyCard(props) {
    const [text, setText] = useState("");
    const [playScreen, setPlayScreen] = useRecoilState(PLAY_SCREEN);
    const socket = useRecoilValue(SOCKET);
    const authtoken = useRecoilValue(AUTHTOKEN);
    const [gameSettings, setGameSettings] = useRecoilState(GAMESETTINGS);
    const [lobbyCode, setLobbyCode] = useRecoilState(LOBBY_CODE);

    useEffect(() => {
        const lobbyStateListener = (data) => {
            setGameSettings({
                'players': data['players'],
                'teams': data['teams'],
                'max_players': data['max_players'],
                'rounds': data['rounds'],
                'questions_num': data['questions_num'],
                'gap_time': data['gap_time'],
                'post_buzz_time': data['post_buzz_time'],
            });
            setLobbyCode(data['code']);
            setPlayScreen(1);
        };

        socket.on("lobbystate", lobbyStateListener);

        return function cleanSockets() {
            socket.off("lobbystate", lobbyStateListener);
        }
    });

    function handleText(event) {
        setText(event.target.value);
    }

    function joinLobby() {
        socket.emit("joinlobby", {
            auth: authtoken,
            lobby: text,
        });
    }

    return (
        <div class="play-gamemodecard-wrapper">
            <div class="play-gamemodecard-pfp" style={{ backgroundImage: `url(${props.icon})` }}></div>
            <div class="play-gamemodecard-title">
                Join a custom lobby!
            </div>

            <input type="text" value={text} placeholder={"Room code"} onChange={handleText} class="play-joincustomlobbycard-textbox"/>
            <div class="play-gamemodecard-start play-hvr-grow" onClick={joinLobby}>
                JOIN
            </div>
        </div>
    )
}


// play page hook
function Play(props) {
    const [gamemode, setGamemode] = useState("casual");

    return (
        <div class="play-content-wrapper">
            <div class="play-gamemode-wrapper">
                <GamemodeBtn name={"Casual"} self={"casual"} gamemode={gamemode} setGamemode={setGamemode}/>
                <GamemodeBtn name={"Ranked"} self={"ranked"} gamemode={gamemode} setGamemode={setGamemode}/>
                <GamemodeBtn name={"Solo"} self={"solo"} gamemode={gamemode} setGamemode={setGamemode}/>
                <GamemodeBtn name={"Custom"} self={"custom"} gamemode={gamemode} setGamemode={setGamemode}/>
            </div>

            <div class="play-gamemodecards-wrapper">
                { gamemode === "casual" && // casual
                    <>
                        <GamemodeComingSoonCard icon={GamemodeIcon1}/>
                        <GamemodeComingSoonCard icon={GamemodeIcon6}/>
                    </>
                }
                { gamemode === "ranked" && // Ranked
                    <>
                        <GamemodeComingSoonCard icon={GamemodeIcon3}/>
                        <GamemodeComingSoonCard icon={GamemodeIcon2}/>
                    </>
                }
                { gamemode === "solo" && // Solo
                    <>
                        <GamemodeComingSoonCard icon={GamemodeIcon5}/>
                    </>
                }
                { gamemode === "custom" && // Custom
                    <>
                        <GamemodeCard icon={GamemodeIcon4} gamesettings={gameSettingsList[5]}/>
                        <JoinCustomLobbyCard icon={GamemodeIcon7}/>
                    </>
                }

            </div>
        </div>
    );
}

export default Play;