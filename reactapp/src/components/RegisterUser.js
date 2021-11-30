import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';


class RegisterUser extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      password_confirmation: '',
      email: ''
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      email: this.state.email
    };

    axios
      .post('http://localhost:8082/auth/signup', data)
      .then(res => {
        this.setState({
          username: '',
          password:'',
          password_confirmation:'',
          email:''
        })
        this.props.history.push('/');
      })
      .catch(err => {
        console.log("Error in RegisterUser!");
      })
  };

  render() {
    return (
      <div className="RegisterUser">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                  Return
              </Link>
            </div>
            <div className="col-md-5 m-auto">
              <h1 className="display-4 text-center">Register An Account</h1>
              <p className="lead text-center">
                  Register an account for MintMind and start your journey today!
              </p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Username'
                    name='username'
                    className='form-control'
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Email'
                    name='name'
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
                <div className='form-group'>
                  <input
                    type='text'
                    placeholder='Confirm password'
                    name='email'
                    className='form-control'
                    value={this.state.password_confirmation}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUser;