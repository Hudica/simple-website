import React from 'react';
import profilePic from './assets/pfp.jpg';
import githubLogo from './assets/github-logo.png';
import linkedinLogo from './assets/linkedin-logo.jpg';

function Home() {
    return (
        <div className="profile-page">
            <div className="profile-container">
            <div className="TextBlock">
                <h1 className="typing-text">Hello,</h1>
                <h2 className="typing-text">I'm Hudson</h2>
                <h5 className="typing-text">Computer Science @ Northeastern</h5>
                <div className="social-images">
                        <div className="social-images">
                            <a href="https://github.com/Hudica" target="_blank" rel="noopener noreferrer">
                                <img src={githubLogo} alt="GitHub logo" />
                            </a>
                            <a href="https://www.linkedin.com/in/hudson-kass-a75834290/" target="_blank" rel="noopener noreferrer">
                                <img src={linkedinLogo} alt="LinkedIn logo" />
                            </a>
                        </div>
                </div>
                <div className="profile-picture">
                    <img src={profilePic} alt="profile picture" />
                </div>
            </div>
        </div>
    </div>
    );
}

export default Home;
