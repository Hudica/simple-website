import React from 'react';
import Card from './Card.jsx'
import './Portfolio.css'

function Portfolio() {
  return (
    <div className = "portfolio">
      <h1>Portfolio Page</h1>
      <div className ="academicList">
        <h2><u>Academics</u></h2>
        <h3>GPA:</h3><p>3.92</p>
        <h3>Notable Classes:</h3>
        <p className="classList">
          <ul>
            <li>Algorithms & Data (A)</li>
            <li>Fundamentals of Computer Science 1 & 2 (A)</li>
            <li>Mathematics of Data Models  (A)</li>
            <li>Discrete Structures (A)</li>
            <li>Intro to Math Reasoning (A)</li>
          </ul>
        </p>
      </div>
      <div class="Cards">
      <Card name="BrightSide Newsletter"
              objective="Developed an automated newsletter delivering the top four most positive, non-controversial news headlines to subscribers. Leveraged the Transformers Library to fine-tune a pre-trained model on hundreds of news headlines, combined with RSS feeds to scrape headlines from credible sources. Utilized Flask for backend operations, MongoDB for user database management, and Amazon SES for custom email distribution. (Jul 2024-Present)"
              skills="Python, HTML, CSS, Flask, APIs, Python Libraries(numpy, pandas, transformers), MongoDB, RSS Feeds, Vercel"
              takeaway="Made my first full stack project by myself, learned how to customly train AI models, create my own APIs, utilize libraries, and safely store user emails"/>
        <Card name="Pawpilot"
              objective="Enhance accessibility to computer science education for underprivileged students through an intuitive web platform integrated with AI. Our website breaks down assignments into manageable steps for beginners, fostering independent learning without directly providing solutions. (Mar 2024-Mar 2024)"
              skills="HTML, CSS, Node.js, API Integration, Resource Management"
              takeaway="Participated in my first hackathon, leading our team to a 1st place victory in the AI category. Learned to effectively use APIs (OpenAI custom GPT models) and the importance of environment variables."/>
        <Card name="Portfolio Website" 
              objective="Designed to showcase my personal journey and passion for learning, this website serves as a professional portfolio for potential opportunities. (Jun 2024 - Present)"
              skills="HTML, CSS, React, JavaScript"
              takeaway="Built my first website independently using React, learning its structural benefits and lots of CSS troubleshooting in the process."/>
        <Card name="Minecraft Mods" 
              objective="Created unique Minecraft mods to enhance gameplay, driven by a passion for the game and learning Java at the time. (Dec 2023 - Mar 2024)"
              skills="Java, JSON/XML, Problem Solving"
              takeaway="Began learning how to interpret existing code and applied it to create features like a 'metal detector' and a 'digger' item, strengthened my understanding of Java and mod development."/>
        <Card name="Highliner AI" 
              objective="Contributed to the development of mock-data generation and a simple email-request website for an AI startup. (Feb 2024 - Jul 2024)"
              skills="HTML, CSS, Node.js, Python, Artificial Intelligence"
              takeaway="My first corporate experience involved more research than coding, deepening my understanding of AI models and data quality, and emphasizing the importance of version control."/>
        </div>


    </div>
  );
}

export default Portfolio;