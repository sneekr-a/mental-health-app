import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


class LoginUserInner extends Component {
  constructor(props) {
    super(props);
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

        console.log(res.data);
        if(res.data.success == true){
          console.log("success")
          localStorage.setItem('mmtoken', res.data.token);
          localStorage.setItem('mmuser', res.data.userid);
        }

        this.props.navigate('/');

      })
      .catch(err => {
        console.log("Error in LoginUser!" + err);
      });
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
                    type='password'
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
                    value="Login"
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

export default function LoginUser(props){
  const navigate = useNavigate();

  return <LoginUserInner {...props} navigate={navigate} />
};