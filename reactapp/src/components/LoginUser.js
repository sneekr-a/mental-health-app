import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class LoginUser extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post('http://localhost:8082/auth/signin', data)
      .then(res => {
        this.setState({
          email: '',
          password: ''
        })
      })
      .catch(err => {
        console.log("Error in LoginUser!");
      })
  };

  render() {
    return (
      <div className="LoginUser">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Return
              </Link>
            </div>
            <div className="col-md-5 m-auto">
              <h1 className="display-4 text-center">Login</h1>
              <br/>
              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    className='form-control'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Password'
                    name='password'
                    className='form-control'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
              <br/>
              <p class="text-center">
                Don't have an account? <a className="link" href="/register">Register.</a>
              </p>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginUser;