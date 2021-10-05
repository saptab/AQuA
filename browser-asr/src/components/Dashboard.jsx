import "../styles/Dashboard.css";
import React from "react";
import ReactDOM from "react-dom";
import { useAlert } from 'react-alert'
import axios from 'axios';


// ASSETS
import ScheduleIcon from '@material-ui/icons/Schedule';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TvIcon from '@material-ui/icons/Tv';


// card in the news column
function NewsCard(props) {
    return (
        <div class="newscard-wrapper">
            <div class="newscard-title">
                {props.title}
            </div>
            <div class="newscard-date-wrapper">
                <ScheduleIcon style={{color: "green", height: "15px", width: "auto"}}/>
                <div class="newscard-date-text">
                    {props.date}
                </div>
            </div>
            <div class="newscard-content">
                {props.content}
            </div>
            <div class="newscard-divider"></div>
        </div>
    );
}

// the news column
function NewsColumn(props) {
    return (
        <div class="newscolumn-wrapper">
            <div class="newscolumn-title-wrapper">
                <EventNoteIcon style={{color: "#6287F7", height: "25px", width: "auto"}}/>
                <div class="newscolumn-title">News</div>
            </div>
            <div class="newscolumn-cards-wrapper">
                <NewsCard title="Official Beta Release!" date="Aug 29th, 2021" content="This is our very first news release- we are officially in Beta!"/>
            </div>
        </div>
    );
}


// QuizzrTV Card
function QuizzrTVCard(props) {
    const alert = useAlert();
    
    return (
        <div class="dashboard-quizzrtv-wrapper" 
        onClick={() => {
            // Deletes your account
            // axios.delete('http://localhost:5000/profile')
            //     .then(function (response) {
            //         // handle success
            //         console.log(response);
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     })

        }}
        >
            <TvIcon style={{color: "white", height: "7rem", width: "auto"}}/>
            COMING SOON
        </div>
    )
}

// Card for coming soon
function ComingSoonCard(props) {
    return (
        <div class="dashboard-comingsoon-wrapper">
            COMING SOON
        </div>
    )
}

// class for the dashboard page
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="dashboard-content-wrapper">
                <NewsColumn/>
                <div class="dashboard-rightcolumn-wrapper">
                    <QuizzrTVCard/>
                    <ComingSoonCard/>
                </div>
            </div>
        );
    }
}

export default Dashboard;