import {Component} from 'react'
import {Link} from 'react-router-dom'
// import {withRouter} from 'react-router-dom'
import Header from '../Header'

import './index.css'

class Home extends Component {
  state = {}

  render() {
    return (
      <div className="home">
        <Header />
        <div className="ml-1">
          <h1>Find The Job That Fits Your Life</h1>
          <p>Millions of people are searching for jobs</p>
          <Link to="/jobs">
            <button type="button" className="logout">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Home
