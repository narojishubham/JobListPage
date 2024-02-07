import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ShareButtons = () => {
  return (
    <div className="social-media-icons" style={{ paddingTop: "1rem" }}>
      <span className="me-4">
        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebookF} style={{ fontSize: "2rem" }} />
        </a>
      </span>

      <span className="me-4">
        <a href="https://twitter.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faTwitter} style={{ fontSize: "2rem" }} />
        </a>
      </span>

      <span className="me-4">
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: "2rem" }} />
        </a>
      </span>
    </div>
  );
};

export default ShareButtons;
