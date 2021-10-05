import { atom, useRecoilValue } from "recoil";
import socketIOClient from "socket.io-client";

const URLS = atom({ // change to real URLS
    key: 'URLS',
    default: {
        'dataflow': 'http://localhost:5000',
        'socket': 'http://127.0.0.1:4000',
        'socket_flask': 'http://localhost:2000',
        'HLS': 'http://localhost:7000',
    }
})

function makeUsername(length) {
    var result           = 'guest';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}

const AUDIO_BLOB = atom<Blob | undefined>({
    key: 'AUDIO_BLOB',
    default: undefined
})

const TEXT = atom<String>({
    key: 'ASR',
    default: ""
})

const SCREEN = atom({
    key: 'SCREEN',
    default: -1
})

const PLAY_SCREEN = atom({
    key: 'PLAY_SCREEN', // 0 = select gamemode screen, 1 = in-lobby screen
    default: 0
})

const JOIN_CUSTOM_LOBBY_SCREEN = atom({
    key: 'JOIN_CUSTOM_LOBBY_SCREEN',
    default: false
})

const LOBBY_CODE = atom({
    key: 'LOBBY_CODE',
    default: ""
})

const SOCKET_ENDPOINT = 'http://127.0.0.1:4000';
const SOCKET = atom({
    key: 'SOCKET',
    default: socketIOClient(SOCKET_ENDPOINT)
})

const PLAYERS = atom({
    key: 'PLAYERS',
    default: [""]
})

const PROFILE = atom({
    key: 'PROFILE',
    default: undefined
})

const TRANSCRIPTS = atom({
    key: 'TRANSCRIPTS',
    default: [
        {"transcript": ""},
        {"transcript": ""},
        {"transcript": ""},
        {"transcript": ""},
    ]
})

const AUTHTOKEN = atom({
    key: 'AUTHTOKEN',
    default: ""
})

const GAMESETTINGS = atom({
    key: 'GAMESETTINGS',
    default: {
        'players': [''],
        'max_players': 8,
        'teams': 0,
        'rounds': 3,
        'questions_num': 10,
        'gap_time': 10,
        'post_buzz_time': 5,
        // tiebreaker
        // topics
    }
})

const PREVSCREEN = atom({
    key: 'PREVSCREEN',
    default: -1
})




export { URLS, AUDIO_BLOB, TEXT, SCREEN, PLAY_SCREEN, JOIN_CUSTOM_LOBBY_SCREEN, LOBBY_CODE, SOCKET, PLAYERS, PROFILE, TRANSCRIPTS, AUTHTOKEN, GAMESETTINGS, PREVSCREEN }

