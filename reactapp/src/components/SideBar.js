import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function SideBarNavElt (props) {
    return (
        <Link to={props.nav} className="SideBar-navElement">
            <i className={props.icon}></i>&nbsp;{props.text}
        </Link>
    );
}

class SideBar extends Component {
    render() {
        return (
            <div className="SideBar">
                <div className="SideBar-logo">
                    <img alt="" className="main-logo" src="logo200x200.png" />&nbsp;&nbsp;MintMind
                </div>
                <SideBarNavElt nav="/journals" icon="bi bi-journals" text="My Journal"/>
                <SideBarNavElt nav="/statistics" icon="bi bi-graph-up-arrow" text="My Stats"/>
                <SideBarNavElt nav="/profile" icon="bi bi-person" text="My Profile"/>
                <SideBarNavElt nav="/alarms" icon="bi bi-clipboard-check" text="My Alarms"/>
            </div>
        )
    }
}

export default SideBar;