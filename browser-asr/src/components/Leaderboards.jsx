import "../styles/Leaderboards.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
    Tooltip,
} from 'react-tippy';

// ASSETS
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';


//single user card
function User(props) {
    return (
        <div class="leaderboards-board-user-wrapper">
            <div class="leaderboards-board-user-rank">
                {props.rank}
            </div>
            <div class="leaderboards-board-user-name">
                {props.username}
            </div>
            <div class="leaderboards-board-user-rating">
                <Tooltip
                    // options
                    title="Rating"
                    position="top"
                    trigger="mouseenter"
                    unmountHTMLWhenHide="true"
                >
                    {props.rating}
                </Tooltip>
            </div>
        </div>
    );
}


// topic card
function Topic(props) {
    return (
        <div className={"leaderboards-topic-wrapper " + (props.self === props.topic ? "leaderboards-topic-wrapper-selected" : "")}
         onClick={() => {props.setTopic(props.self)}}
         >
            <div class="leaderboards-topic-name">
                {props.name}
            </div>
            

            <div>
                <Tooltip
                    // options
                    title="Objective rank"
                    position="top"
                    trigger="mouseenter"
                    unmountHTMLWhenHide="true"
                >
                #{props.rank}
                </Tooltip>

                / 
                
                <Tooltip
                    // options
                    title="Relative rank"
                    position="top"
                    trigger="mouseenter"
                    unmountHTMLWhenHide="true"
                >
                {props.percentile}%
                </Tooltip>
            </div>
        </div>
    )
}

//leaderboards hook
function Leaderboards() {
    const [topic, setTopic] = useState("all");
    return (
        <div class="leaderboards-content-wrapper">
            <div class="leaderboards-board-wrapper">
                <div class="leaderboards-board-title">
                    <EmojiEventsIcon style={{color: "#6287F6", marginRight: "0.5rem"}}/>
                    Global Leaderboards
                </div>
                <div class="leaderboards-board-content-wrapper-wrapper">
                    <div class="leaderboards-board-content-wrapper">
                        {/* <User rank="1" rating={3798} username="bob1"/>
                        <User rank="2" rating={3564} username="bob2"/>
                        <User rank="3" rating={3543} username="bob3"/>
                        <User rank="4" rating={3489} username="bob4"/>
                        <User rank="5" rating={3401} username="bob5"/>
                        <User rank="6" rating={3391} username="bob6"/>
                        <User rank="7" rating={3364} username="bob7"/>
                        <User rank="8" rating={3362} username="bob8"/>
                        <User rank="9" rating={3351} username="bob9"/>
                        <User rank="10" rating={3340} username="bob10"/> */}
                    </div>
                </div>
                
            </div>
            <div class="leaderboards-topics-content-wrapper">
                <div class="leaderboards-topics-title">
                    Topics
                </div>
                <div class="leaderboards-topics-title-divider"></div>
                <div class="leaderboards-topic-list-wrapper">
                    <Topic name="Overall" rank="--" percentile="--" self={"all"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Current Events" rank="--" percentile="--" self={"currentevents"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Fine Arts" rank="--" percentile="--" self={"finearts"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Geography" rank="--" percentile="--" self={"geography"} topic={topic} setTopic={setTopic}/>
                    <Topic name="History" rank="--" percentile="--" self={"history"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Literature" rank="--" percentile="--" self={"literature"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Mythology" rank="--" percentile="--" self={"mythology"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Philosophy" rank="--" percentile="--" self={"philosophy"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Religion" rank="--" percentile="--" self={"religion"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Science" rank="--" percentile="--" self={"science"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Social Science" rank="--" percentile="--" self={"socialscience"} topic={topic} setTopic={setTopic}/>
                    <Topic name="Trash" rank="--" percentile="--" self={"trash"} topic={topic} setTopic={setTopic}/>
                </div>
            </div>
        </div>
    );
}

export default Leaderboards;