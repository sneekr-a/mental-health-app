import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

class SideBar extends Component {
    render(){
        return(
            <div className="SideBar">
                <div className="SideBar-logo">
                    <img alt="" className="main-logo" src="logo200x200.png"/>&nbsp;&nbsp;MintMind
                </div>
                <Link to="/journals" className="SideBar-navElement">
                <i class="bi bi-journals"></i>&nbsp;My Journal
                </Link>
                <Link to="/statistics" className="SideBar-navElement">
                <i class="bi bi-graph-up-arrow"></i>&nbsp;My Stats
                </Link>
                <Link to="/profile" className="SideBar-navElement">
                <i class="bi bi-person"></i>&nbsp;My Profile
                </Link>
                <Link to="/routines" className="SideBar-navElement">
                <i class="bi bi-clipboard-check"></i>&nbsp;My Routines
                </Link>
            </div>
        )
    }
}

export default SideBar;