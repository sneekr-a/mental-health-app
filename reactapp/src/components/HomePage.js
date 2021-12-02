import React, { Component } from 'react';
import '../App.css';

import SideBar from './SideBar'

class HomePage extends Component {
    render(){
        return (
            <div className="HomePage">
                < SideBar />
                <div className="text-center container">
                    <h1>&nbsp;</h1>
                    <h1> Welcome to MintMind! </h1>
                    <h1>&nbsp;</h1>
                    <div className="row-md-4  w-100">
                        <h5>
                            If you haven't already,&nbsp;
                            <a className="link" href="/register">register here.</a>
                            <br/>
                            Otherwise,&nbsp;
                            <a className="link" href="/login">login here.</a>
                        </h5>
                    </div>
                    <div className="row-md-4">
                    </div>
                </div>
            </div>
        )
    }
}

export default HomePage;