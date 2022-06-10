import Header from '../Header'
import './index.css'

const NotFound = () => {
  const neu = 0
  return (
    <div>
      <Header />
      <div className="notfound p-1 d-flex flex-column justify-content-center align-items-center">
        <img
          alt="not found"
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        />
        <h1>Page Not Found</h1>

        <p>we're sorry, the page you requested could not be found.</p>
      </div>
    </div>
  )
}
export default NotFound
