import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Profile extends Component {
  state = {profileProps: ''}

  componentDidMount() {
    this.fetchProfileData()
  }

  fetchProfileData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const responseJson = await response.json()
    const camelProfileDetails = responseJson.profile_details
    const camelProfile = {
      name: camelProfileDetails.name,
      profileImageUrl: camelProfileDetails.profile_image_url,
      shortBio: camelProfileDetails.short_bio,
    }
    this.setState({profileProps: camelProfile})
    // console.log(camelProfile)
  }

  LoaderFun = () => {
    const num = 0
    return (
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  render() {
    const {profileProps} = this.state
    const {name, profileImageUrl, shortBio} = profileProps
    return (
      <div className="profile p-1">
        <img alt="profile" src={profileImageUrl} />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }
}
export default Profile
