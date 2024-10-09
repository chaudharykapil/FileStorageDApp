import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Firstpage.css";
import "./Secondpage";
import Discordsvg from "./Discordsvg";
import Twittersvg from "./Twittersvg";
import Instagramsvg from "./Instagramsvg";
import myvideo from "./videos/first.mp4";
import img1 from "./images/first-image-min.png";
import img2 from "./images/second-image-min.png";
import img3 from "./images/third-image-min.png";
import Navbar from "./Navbar";

function Firstpage() {
  const [imageSrc, setImageSrc] = useState(img3);

  const handleHeadingClick = (newImageSrc) => {
    setImageSrc(newImageSrc);
  };

  return (
    <div>
      <div className="navbar-section">
        <Navbar />
      </div>
      <div className="hero">
        <div className="video-background">
          <video autoPlay muted loop>
            <source src={myvideo} type="video/mp4" />
          </video>
          <div className="hero-content">
            <div className="hero-heading-box">
              <h1 className="hero-heading">
                Innovate Your File Storage with Decentralization
              </h1>
            </div>
            <h1 className="hero-subheading"> Your Data, Your Control</h1>
            <p className="hero__description">
              Join the movement towards a more decentralized web, where users
              own and control their data, and where censorship and surveillance
              are a thing of the past.
            </p>
            <button
              className="hero-button"
              onClick={() => {
                window.location.href = "/secondpage";
              }}
            >
              <Link className="hero-button-text" to="/secondpage">
                Click here to Upload the file
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Firstpage;
