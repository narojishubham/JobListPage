import { faBuilding, faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function OtherJobOpeningCard({ otherJobs }) {
  return (
    <>
      {otherJobs.length > 0 &&
        otherJobs.map((job) => {
          return (
            <div key={job.id} style={{ paddingTop: "1rem" }}>
              <h3>{job.title}</h3>
              <div
                style={{ display: "flex", gap: "1rem", marginTop: "-0.2rem" }}
              >
                <div>
                  {" "}
                  <FontAwesomeIcon icon={faBuilding} /> {job.industry}
                </div>{" "}
                <div>
                  <FontAwesomeIcon icon={faMapMarker} /> {job.location.city},{" "}
                  {job.location.state}
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default OtherJobOpeningCard;
