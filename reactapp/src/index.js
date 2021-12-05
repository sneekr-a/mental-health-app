import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// NOT SURE IF THIS IS WHERE WE WANT TO ADD THIS (FEEL FREE TO MOVE)
axios.defaults.baseURL ='(NOT SURE WHAT TO PUT HERE)';    // check this line
let userData = JSON.parse(localStorage.getItem("userData"))
let token

if (userData) {
  token = userData.token
}

axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(request => {
  return request;
},

error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  return response;
},
error => {
  console.log(error.response);
  return Promise.reject(error);
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
