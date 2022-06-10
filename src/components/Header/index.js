import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  logout = () => {
    Cookies.remove('jwt_token')

    const {history} = this.props

    history.replace('/login')
  }

  render() {
    return (
      <ul className="header">
        <li>
          <Link to="/">
            <img
              className="header-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </Link>
        </li>

        <li className="d-flex flex-row">
          <Link className="link1" to="/">
            <p>Home</p>
          </Link>
          <Link className="link1" to="/jobs">
            <p className="ml-1">Jobs</p>
          </Link>
        </li>
        <li>
          <button onClick={this.logout} className="logout">
            Logout
          </button>
        </li>
      </ul>
    )
  }
}
export default withRouter(Header)
