import {Link} from 'react-router-dom'
import './index.css'

const JobComponent = props => {
  const {jobdetails} = props
  const {
    companyLogoUrl,
    id,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobdetails
  //   console.log(jobdetails)
  return (
    <Link className="link" to={`jobs/${id}`}>
      <div className="job-item col-12 m-1 p-1">
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div>
                <img alt="company logo" className="pr-1" src={companyLogoUrl} />
              </div>
              <div className="d-flex flex-column">
                <h1>{title}</h1>
                <div className="d-flex flex-row">
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-space-between col-12">
              <div className="d-flex flex-row">
                <p className="m-1">{location}</p>
                <p className="m-1">{employmentType}</p>
              </div>
              <div>
                <p className="m-1">{packagePerAnnum}</p>
              </div>
            </div>
          </div>
          <hr />
          <div className="d-flex flex-column">
            <h1>Description</h1>
            <p>{jobDescription}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default JobComponent
