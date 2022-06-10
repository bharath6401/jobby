import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import SimilarJobItem from '../SimilarJobItem'

import Header from '../Header'

import './index.css'

const jobsState = {
  initial: 'INITIAL',
  sucess: 'SUCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobDetailSection extends Component {
  state = {
    pageState: 'initial',
    jobData: {},
    skills: [],
    lifeAtCompany: {},
    similarJobs: [],
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log('id', id)
    this.FetchApiJobDetailSection(id)
  }

  JobDetails = () => {
    const {jobData} = this.state
    const {
      companyLogoUrl,
      id,
      employmentType,
      jobDescription,
      location,
      companyWebsiteUrl,
      packagePerAnnum,
      rating,
      title,
    } = jobData

    return (
      <li className="m-1 p-1">
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <div className="d-flex flex-row">
              <div>
                <img
                  alt="job details company logo"
                  className="pr-1"
                  src={companyLogoUrl}
                />
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
            <div className="visit-description">
              <h1>Description</h1>
              <a href={companyWebsiteUrl}>Visit</a>
            </div>

            <p>{jobDescription}</p>
          </div>
        </div>
      </li>
    )
  }

  FetchApiJobDetailSection = async id => {
    const jwtToken = Cookies.get('jwt_token')

    this.setState({pageState: jobsState.loading})
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const responseJson1 = await response.json()
    if (response.ok) {
      const responseJson = responseJson1.job_details
      const lifeAtCompanyListTemp = responseJson1.job_details.life_at_company
      const CamelLifeAtCompanyListTemp = {
        description: lifeAtCompanyListTemp.description,
        imageUrl: lifeAtCompanyListTemp.image_url,
      }
      const skills = [...responseJson.skills]
      const CamelSkills = skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      }))
      const camelJobData = {
        companyLogoUrl: responseJson.company_logo_url,
        id: responseJson.id,
        companyWebsiteUrl: responseJson.company_website_url,
        employmentType: responseJson.employment_type,
        jobDescription: responseJson.job_description,
        location: responseJson.location,
        packagePerAnnum: responseJson.package_per_annum,
        rating: responseJson.rating,
        title: responseJson.title,
      }
      const similarJobsTest = responseJson1.similar_jobs
      const similarJobsCamel = similarJobsTest.map(eachSimilarJob => ({
        companyLogoUrl: eachSimilarJob.company_logo_url,
        id: eachSimilarJob.id,
        employmentType: eachSimilarJob.employment_type,
        jobDescription: eachSimilarJob.job_description,
        location: eachSimilarJob.location,
        packagePerAnnum: eachSimilarJob.package_per_annum,
        rating: eachSimilarJob.rating,
        title: eachSimilarJob.title,
      }))

      console.log(similarJobsCamel)

      this.setState(
        {
          pageState: jobsState.sucess,
          jobData: {...camelJobData},
          skills: [...CamelSkills],
          lifeAtCompany: {...CamelLifeAtCompanyListTemp},
          similarJobs: [...similarJobsCamel],
        },
        this.JobDetails,
      )
    } else {
      this.setState({pageState: jobsState.failure})
    }

    console.log(responseJson1)
  }

  SkillItem = props => {
    const {prop} = props
    const {name, imageUrl} = prop
    return (
      <li className="d-flex flex-row">
        <img alt={name} src={imageUrl} />
        <p>{name}</p>
      </li>
    )
  }

  sucessFun = () => {
    const {skills, lifeAtCompany, similarJobs} = this.state
    const {description, imageUrl} = lifeAtCompany
    console.log(skills)

    return (
      <div className="jobDetails">
        <Header />
        <div className="job-item m-1 p-1">
          {this.JobDetails()}
          <div className="p-1">
            <h1>Skills</h1>
            <div className="skills">
              <ul className="skillUl">
                {skills.map(eachSkill => (
                  <this.SkillItem key={eachSkill.name} prop={eachSkill} />
                ))}
              </ul>
            </div>
            <div className="p-1">
              <h1>Life at company</h1>
              <div className="d-flex flex-row">
                <div>
                  <p>{description}</p>
                </div>
                <div>
                  <img alt="life at company" src={imageUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="similarJobSection p-1">
          <h1>Similar Jobs</h1>
          <ul className="similarJobsList d-flex flex-row flex-wrap">
            {similarJobs.map(eachSimilarJob => (
              <SimilarJobItem key={eachSimilarJob.id} prop={eachSimilarJob} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  retryFun = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.FetchApiJobDetailSection(id)
  }

  FailureFun = () => {
    const num = 0
    return (
      <div className="d-flex col-12 flex-column">
        <Header />
        <div className="d-flex flex-column align-items-center">
          <img
            alt="failure view"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          />

          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button onClick={this.retryFun}>Retry</button>
        </div>
      </div>
    )
  }

  LoaderFun = () => {
    const niu = 0
    return (
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  render() {
    const {pageState} = this.state

    switch (pageState) {
      case 'LOADING':
        return this.LoaderFun()
      case 'SUCESS':
        return this.sucessFun()
      case 'FAILURE':
        return this.FailureFun()
      default:
        return null
    }
  }
}

export default JobDetailSection
