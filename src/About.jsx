import React from 'react';
import './About.css';
import khouryPic from './assets/khoury-pic.jpg';
import pawhackPic from './assets/pawhacks-pic.png';

function About() {
  return (
    <div className="about-page">
      <h1><u>About Me</u></h1>
        <div className="about-block">
          <div className="about-text">

          <p className="t1">
              Hello! I’m Hudson Kass from Sammamish, WA, currently studying Computer Science at Northeastern University. I began programming in my freshman year and have quickly grown passionate, enjoying the challenge of solving real-world problems and enhancing my skills. Outside of programming, I engage in hackathons, explore new technologies, and enjoy connecting with tech enthusiasts.
          </p>

          <p className="t2">
              In my free time, I stay active by working out or participating in physical activities almost every day. I’m an avid reader of nonfiction and love exploring the outdoors through hiking and camping, which helps me relax and appreciate the natural beauty around me.
          </p>

          <p className="t3">
              I aim to work at a company that makes a positive impact and values every employee’s input. I thrive in collaborative environments that foster innovation and value diverse perspectives. I’m also keen on finding a workplace that supports professional growth and development, helping each individual reach their potential.
</p>
          </div>
          <div className="pictures">
            <img src={khouryPic} alt="picture of Hudson at Khoury College" />
            <img src={pawhackPic} alt="picture of Hudson at PawHacks event" />
          </div>
        </div>
    </div>
  );
}

export default About;
