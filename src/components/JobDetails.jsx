/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/JobDetails.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
function JobDetails() {
  const { id } = useParams();

  const [JobDetails, setJobDetails] = useState([]);
  const [otherJobs, setOtherJobs] = useState([]);
  
  const getJobDetailsById = async () => {
    try {
      const response = await axios.get(
        `https://demo.jobsoid.com/api/v1/jobs/${id}`
      );

      setJobDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getJobs = async () => {
    try {
      const response = await axios.get("https://demo.jobsoid.com/api/v1/jobs");

      setOtherJobs(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobDetailsById(id);
  }, [id]);

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <div>
        <div className="job-dept-title">
          {JobDetails?.department} Department at {JobDetails?.company}
        </div>
        <div className="job-position-title">{JobDetails?.title}</div>
        <div className="job-details">
          <span className="me-2">
            <FontAwesomeIcon icon={faBuilding} /> {JobDetails?.industry}{" "}
          </span>
          <span className="me-2">
            <FontAwesomeIcon icon={faMapMarker} /> {JobDetails?.location?.city},{" "}
            {JobDetails?.location?.state}
          </span>
          <span>
            <label className="badge bg-secondary">Full Time</label>
          </span>
        </div>
        <div className="job-apply-btn mt-4">
          <a href={JobDetails?.applyUrl} className="apply-button me-5">
            <button className="btn btn-apply">Apply</button>
          </a>
        </div>

        <div className="job-description mt-4">
          <div className="job-description-title">Job Description</div>
          <div
            className="job-description-text"
            dangerouslySetInnerHTML={{ __html: JobDetails?.description }}
          ></div>
        </div>

        <div className="other-jobs mt-5">
          <div className="other-jobs-title">Other Job Openings</div>
          <div className="other-jobs-list">
            {otherJobs.length > 0 &&
              otherJobs.map((job) => {
                return (
                  <li className="job-item" key={job.id}>
                    <div className="row">
                      <div className="col">
                        <Link to={`/job-details/${job.id}`}>
                          <div className="job-title">{job.title}</div>
                        </Link>

                        <div className="job-details">
                          <span className="me-2">
                            <FontAwesomeIcon icon={faBuilding} /> {job.industry}{" "}
                          </span>
                          <span className="me-2">
                            <FontAwesomeIcon icon={faMapMarker} />{" "}
                            {job.location.city}, {job.location.state}
                          </span>
                          <span>
                            <label className="badge bg-secondary">
                              Full Time
                            </label>
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
          </div>
        </div>

        <div className="social-media mt-5">
          <div className="social-media-title">Share this job</div>
          <div className="social-media-icons">
            <span className="me-4">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
            </span>

            <span className="me-4">
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </span>

            <span className="me-4">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetails;
