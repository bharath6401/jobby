import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Header from '../Header'

import JobComponent from '../JobComponent'

import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const jobsState = {
  initial: 'INITIAL',
  sucess: 'SUCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    employmentType: '',
    employmentTypeList: [],
    minimumPackage: '',
    searchInput: '',
    jobsList: [],
    pageState: jobsState.initial,
  }

  componentDidMount() {
    this.searchJobsApiFun()
  }

  PackageCheckBoxClicked = event => {
    // console.log(event)
    // console.log(event.target.id)
    // console.log(event.target.checked)
    const {minimumPackage} = this.state
    console.log(event.target)
    // if (event.target.checked) {
    this.setState(
      {
        minimumPackage: event.target.id,
      },
      this.searchJobsApiFun,
    )
    // } else {
    //   this.setState(
    //     {
    //       minimumPackage: '',
    //     },
    //     this.searchJobsApiFun,
    //   )
    // }
  }

  CheckBoxClicked = event => {
    // console.log(event)
    // console.log(event.target.id)
    // console.log(event.target.checked)
    const {employmentTypeList} = this.state

    if (event.target.checked) {
      const employmentTypeListTemp = [...employmentTypeList, event.target.id]
      const joinList = employmentTypeListTemp.join(',')
      console.log(joinList)
      this.setState(
        {
          employmentType: joinList,
          employmentTypeList: [...employmentTypeListTemp],
        },
        this.searchJobsApiFun,
      )
    } else {
      const employmentTypeMapList = employmentTypeList.filter(
        eachItem => eachItem !== event.target.id,
      )
      const employmentTypeListTemp = [...employmentTypeMapList]
      const joinList = employmentTypeListTemp.join(',')

      this.setState(
        {
          employmentType: joinList,
          employmentTypeList: [...employmentTypeListTemp],
        },
        this.searchJobsApiFun,
      )
    }
  }

  getSortByLists = () => {
    const num = 0
    return (
      <div className="col-12">
        <div>
          <h1>Type of Employment</h1>
          <ul>
            {employmentTypesList.map(eachCheckbox => (
              <li
                key={eachCheckbox.employmentTypeId}
                className="d-flex flex-row"
              >
                <input
                  id={eachCheckbox.employmentTypeId}
                  onClick={this.CheckBoxClicked}
                  type="checkbox"
                />
                <label htmlFor={eachCheckbox.employmentTypeId}>
                  {eachCheckbox.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div>
          <h1>Salary Range</h1>
          <ul>
            {salaryRangesList.map(eachCheckbox => (
              <li key={eachCheckbox.salaryRangeId} className="d-flex flex-row">
                <input
                  onClick={this.PackageCheckBoxClicked}
                  id={eachCheckbox.salaryRangeId}
                  type="radio"
                  name="name"
                />
                <label htmlFor={eachCheckbox.salaryRangeId}>
                  {eachCheckbox.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  AllJobsFun = () => {
    const {jobsList, employmentTypeList} = this.state

    // const jobsList = []
    if (jobsList[0] === undefined) {
      console.log('hello')
      return (
        <div>
          <h1>not found</h1>
          <img
            alt="no jobs"
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          />
        </div>
      )
    }
    return (
      <ul className="p-1">
        {jobsList.map(job => (
          <li>
            <JobComponent key={job.id} jobdetails={job} />
          </li>
        ))}
      </ul>
    )

    // ul li job item todo
  }

  searchInputButtonClicked = event => {
    const num = 0
    this.searchJobsApiFun()
  }

  SearchInputFun = event => {
    console.log(event.target.value)
    this.setState({searchInput: event.target.value})
  }

  searchJobsApiFun = async () => {
    const {
      employmentType,
      minimumPackage,
      searchInput,
      employmentTypeList,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    this.setState({pageState: jobsState.loading})
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${minimumPackage}&search=${searchInput}`,
      options,
    )

    if (response.ok) {
      const responseJson = await response.json()
      const {jobs} = responseJson

      const CamelJobs = jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        id: job.id,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({jobsList: [...CamelJobs], pageState: jobsState.sucess})

      //   console.log(CamelJobs)
    } else {
      const responseJson = await response.json()
      this.setState({pageState: jobsState.failure})
      console.log(responseJson)
    }
  }

  LoaderFun = () => {
    const niu = 0
    return (
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  retryFun = () => {
    this.searchJobsApiFun()
  }

  FailureFun = () => {
    const num = 0
    return (
      <div>
        <img
          alt="failure view"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        />

        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
        <button onClick={this.retryFun}>Retry</button>
      </div>
    )
  }

  sucessFun = () => {
    const num = 0
    return (
      <div>
        <Header />
        <div className="jobs col-12 d-flex flex-row">
          <div className="col-3 m-1 fixed">
            <div>
              <Profile />
            </div>
            <hr />
            {this.getSortByLists()}
          </div>
          <div className="col-8">
            <div className="d-flex flex-row searchdiv">
              <input
                alt="search"
                type="search"
                className="search"
                onChange={this.SearchInputFun}
              />
              <button
                className="searchIcon"
                onClick={this.searchInputButtonClicked}
                type="button"
                testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            <div className="col-12 d-flex flex-column align-items-center">
              {this.switchViews()}
            </div>
          </div>
        </div>

        <div className="similarJobsSection">
          <ul>{}</ul>
        </div>
      </div>
    )
  }

  switchViews = () => {
    const {pageState} = this.state
    switch (pageState) {
      case 'LOADING':
        return this.LoaderFun()
      case 'SUCESS':
        return this.AllJobsFun()
      case 'FAILURE':
        return this.FailureFun()
      default:
        return null
    }
  }

  render() {
    return <div>{this.sucessFun()}</div>
  }
}
export default Jobs
