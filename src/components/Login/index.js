// import  from 'react-router-dom'
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', LoginErrorMsg: '', loginError: false}

  PasswordInputFun = event => {
    this.setState({password: event.target.value})
  }

  UsernameInputFun = event => {
    this.setState({username: event.target.value})
  }

  SubmitForm = event => {
    event.preventDefault()
    const {password, username} = this.state
    this.PostLoginDetails()

    console.log(username, password)
  }

  PostLoginDetails = async () => {
    const {password, username} = this.state
    // const credentials = {username: username, password: password}
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const responseJson = await response.json()
    Cookies.set('jwt_token', responseJson.jwt_token, {expires: 30})
    if (response.ok) {
      console.log('loginSucess')
      this.LoginSucess()
    } else {
      const errorMsg = responseJson.error_msg
      this.setState({LoginErrorMsg: errorMsg, loginError: true})
      console.log(responseJson)
    }
    // console.log(responseJson)
    // console.log(Cookies.get('jwt_token'))
  }

  LoginSucess = () => {
    const {history} = this.props
    console.log('loginSucess')
    history.replace('/')
  }

  render() {
    const {password, username, LoginErrorMsg, loginError} = this.state
    const jwtToken = Cookies.get('jwt_token')

    // console.log(username, password)
    return (
      <div className="login col-12 d-flex flex-column justify-content-center align-items-center bg-black">
        <div className="login-form bg-gray p-2 m-1">
          <div className="d-flex flex-row justify-content-center m-1">
            <img
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </div>
          <form className="d-flex flex-column">
            <label className="" htmlFor="username">
              USERNAME
            </label>
            <input
              placeholder="Username"
              className=""
              value={username}
              onChange={this.UsernameInputFun}
              id="username"
              type="text"
            />
            <label className="" htmlFor="password">
              PASSWORD
            </label>
            <input
              placeholder="Password"
              value={password}
              onChange={this.PasswordInputFun}
              id="password"
              type="password"
            />
            <button
              onClick={this.SubmitForm}
              className="login-button"
              type="submit"
            >
              Login
            </button>
            {loginError && <p className="errormsg">*{LoginErrorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
