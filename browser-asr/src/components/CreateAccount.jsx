import '../styles/CreateAccount.css';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAlert } from 'react-alert';
import { useRecoilState, useRecoilValue } from "recoil";
import { PROFILE, SCREEN, URLS } from "../store";
import firebase from 'firebase';
import axios from 'axios';


//hook for creating accounts
function CreateAccount(props) {
    const urls = useRecoilValue(URLS);
    const [username, setUsername] = useState('');
    const [screen, setScreen] = useRecoilState(SCREEN);
    const placeholderUsername = "mickthemouse123";
    const [profile, setProfile] = useRecoilState(PROFILE);
    const alert = useAlert()

    //restricts usernames to alphanumeric
    function handleUsername(event) {
        setUsername(event.target.value.replace(/[^a-z0-9]/gi,''));
    }

    //registers the user
    function register() {
        axios.post(urls['dataflow'] + '/profile', {
                pfp: [1, 2, 3, 4],
                username: username
            })
            .then(function (response) {
                axios.get(urls['dataflow'] + '/profile')
                    .then(function (response) {
                        // handle success
                        setProfile(response['data']);
                        setScreen(2);
                    })
                    .catch(function (error) {
                        if(error.response.status === 404) {
                            setScreen(7);
                        }
                    });
            })
            .catch(function (error) {
                alert.error("Failed to register account");
            });
    }

    return (
        <div class="createaccount-content-wrapper">
            <div class="createaccount-quizzr-title">
                Quizzr
            </div>
            <div class="createaccount-quizzr-subtitle">
                <b>the</b> quiz game
            </div>
            <div class="createaccount-body-wrapper">
                <div class="createaccount-welcome-wrapper">
                    <div class="createaccount-welcome-welcome">
                        Welcome, 
                    </div>
                    <div class="createaccount-welcome-firstname">
                        {firebase.auth().currentUser.displayName}
                    </div>
                </div>
                <div class="createaccount-description">
                    Before you can play, we just need some last bits of information from you: 
                </div>
                <div class="createaccount-username-label">
                    <div>
                        Username: 
                    </div>
                    <div class="createaccount-username-textbox-wrapper">
                        <div class="createaccount-tinylabel"></div>
                        <input type="text" value={username} placeholder={placeholderUsername} onChange={handleUsername} class="createaccount-username-textbox"/>
                        <div class="createaccount-tinylabel">
                            Alphanumeric characters only
                        </div>
                    </div>
                </div>
                <div class="createaccount-footer-btn-wrapper">
                    <div class="createaccount-footer-btn-register" onClick={register}>
                        Register
                    </div>
                    <div class="createaccount-footer-btn-cancel" onClick={() => {firebase.auth().signOut();}}>
                        Cancel
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default CreateAccount;