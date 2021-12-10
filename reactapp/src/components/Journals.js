import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

import SideBar from './SideBar';
import axios from 'axios';

class JournalsInner extends Component {
    // Sets states
    constructor(props) {
        super(props);
        this.state = {
            token: localStorage.getItem('mmtoken'),
            userid: localStorage.getItem('mmuser'),
            title: '',
            content: '',
            success: 'Submit'
        }
    }

    // Redirects user if they need to log in
    componentDidMount() {
        setTimeout(() => {
            if (this.state.token === null) {
                const { navigate } = this.props;
                navigate('/login')
            }
        }, 0)
    }

    //Pushes changes from forms to state
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value});
    }

    //Submits posts
    onSubmit = e =>{
        e.preventDefault();

        //Data of our post request.
        const data = {
            postTitle: this.state.title,
            postContent: this.state.content,
            postAuthor: this.state.userid,
            postDate: Date.now(),
            privacy: 0
        }

        //Forming the post req with axios
        axios
        .post('http://localhost:8082/post', data)
        .then(res => {
            this.setState({
                title: '',
                content: '',
                success: "Post successful!"
            })
        }).catch((err) => {
            console.log("Error in journal post." + err);
        });

    }

    //Render HTML
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
                                        placeholder="Title"
                                        name='title'
                                        value={this.state.title}
                                        onChange={this.onChange}>
                                    </input>
                                    <br />
                                    <textarea className="form-control"
                                        rows="8"
                                        placeholder="How are you feeling today?"
                                        name='content'
                                        value={this.state.content}
                                        onChange={this.onChange}>

                                    </textarea>
                                    <input
                                        type="submit"
                                        className="btn btn-outline-success btn-block mt-4"
                                        value={this.state.success}
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

//Wrapper function for redirects
export default function Journals(props) {
    const navigate = useNavigate();

    return (<JournalsInner {...props} navigate={navigate} />)
}