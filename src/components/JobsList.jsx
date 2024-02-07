/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import "../css/JobsList.css";
import { Link } from "react-router-dom";

function JobsList({ jobs }) {
  return (
    <>
      <div>
        <div className="dept-title">Job Openings</div>
        <ul className="jobs-list" style={{ paddingLeft: "0" }}>
          {jobs.map((job) => {
            return (
              <li className="job-item" key={job.id}>
                <div className="row">
                  <div className="col">
                    <div className="job-title">{job.title}</div>
                    <div className="job-details">
                      <span className="me-2">
                        <FontAwesomeIcon icon={faBuilding} /> {job.industry}{" "}
                      </span>
                      <span className="me-2">
                        <FontAwesomeIcon icon={faMapMarker} />{" "}
                        {job.location.city}, {job.location.state}
                      </span>
                      <span>
                        <label className="badge bg-secondary">Full Time</label>
                      </span>
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="job-apply mt-4">
                      <a href={job.applyUrl} className="apply-button me-5">
                        <button className="btn btn-apply">Apply</button>
                      </a>
                      <Link to={`/job-details/${job.id}`}>
                        <button className="btn btn-secondary">View</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default JobsList;
