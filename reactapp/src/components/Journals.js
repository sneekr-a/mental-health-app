import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import SideBar from './SideBar';

class JournalsInner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('mmtoken'),
            userid: localStorage.getItem('mmuser')
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.state.token === null) {
                const { navigate } = this.props;
                navigate('/login')
            }
        }, 0)
    }

    render() {
        console.log(this.props.token);
        return (
            <div className="Journals">
                <SideBar />
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <h1 className="display-4 text-center">Journals</h1>
                        </div>
                        <div className="col-lg-12 m-auto">
                            <div className="form-group">
                                <h3>Write a new journal!</h3>
                                <br />
                                <form noValidate onSubmit={this.onSubmit}>
                                    <input className="form-control form-control-lg"
                                        rows="1"
                                        placeholder="Title">

                                    </input>
                                    <br />
                                    <textarea className="form-control"
                                        rows="8"
                                        placeholder="How are you feeling today?">

                                    </textarea>
                                    <input
                                        type="submit"
                                        className="btn btn-outline-success btn-block mt-4"
                                        value="Submit"
                                    />
                                </form>
                            </div>
                            <br /><br />
                            <div>
                                <h3 className="text-centered">
                                    Previous Journals
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default function Journals(props) {
    const navigate = useNavigate();

    return (<JournalsInner {...props} navigate={navigate} />)
}