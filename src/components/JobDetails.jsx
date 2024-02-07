import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/JobDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import OtherJobOpeningCard from "./OtherJobOpeningCard/index.jsx";
import ShareButtons from "./ShareBaseOnIcon/index.jsx";

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
        <div style={{ borderBottom: "1px solid", margin: "2rem 2rem 0" }}>
          <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
            {JobDetails?.department} Department at {JobDetails?.company}
          </div>
          <div
            style={{ fontSize: "2rem", fontWeight: 700, paddingTop: "0.5rem" }}
          >
            {JobDetails?.title}
          </div>
          <div>
            <div style={{ display: "flex", gap: "1rem", padding: "0.6rem 0" }}>
              <div>
                {" "}
                <FontAwesomeIcon icon={faBuilding} /> {JobDetails?.industry}{" "}
              </div>{" "}
              <div>
                <FontAwesomeIcon icon={faMapMarker} />{" "}
                {JobDetails?.location?.city}, {JobDetails?.location?.state}
              </div>
              <div className="CourseType">Full Time</div>
            </div>
          </div>
          <div style={{ padding: "3rem 0 4rem" }}>
            <a
              href={JobDetails?.applyUrl}
              rel="noopener noreferrer"
              style={{
                width: "12rem",
                height: "3.5rem",
                borderRadius: "2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#007bff",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              Apply
            </a>
          </div>
        </div>

        <div style={{ display: "flex", paddingTop: "3rem", width: "100%" }}>
          <div style={{ margin: "0 2rem", width: "80%" }}>
            {JobDetails?.description != "" ? (
              <div
                style={{ textAlign: "justify" }}
                dangerouslySetInnerHTML={{
                  __html: JobDetails?.description,
                }}
              />
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2>Looking for React Experts.</h2>
                  <p>
                    You must understand the ins and outs of ReactJS, with an
                    obsession for code quality. We want someone that is proud
                    and obsessive in delivering quality products. Get-it-done
                    attitude as an independent thinker who enjoys creating
                    solutions in a collaborative environment.
                  </p>
                </div>
              </>
            )}
          </div>
          <div style={{ width: "30%" }}>
            <div style={{ background: " #cfcdcd", padding: "2rem 2rem" }}>
              <h2>OTHER JOB OPENINGS</h2>
              <div className="HeaderUnderLine1"></div>

              <OtherJobOpeningCard otherJobs={otherJobs} />
            </div>
            <div style={{ paddingLeft: "2rem", paddingTop: "5rem" }}>
              <h2>SHARE JOB OPENINGS</h2>
              <div className="HeaderUnderLine1"></div>

              <ShareButtons />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDetails;
