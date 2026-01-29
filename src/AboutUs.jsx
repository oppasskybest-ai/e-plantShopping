import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1 className="about-us-title">Paradise Nursery</h1>
        <p className="about-us-tagline">Where Green Meets Serenity</p>
      </div>
      
      <div className="about-us-content-section">
        <p className="about-us-description">
          Welcome to Paradise Nursery, where green meets serenity!
        </p>
        
        <div className="about-us-content">
          <p>
            At Paradise Nursery, we are passionate about bringing nature closer to you. 
            Our mission is to provide a wide range of high-quality plants that not only 
            enhance the beauty of your surroundings but also contribute to a healthier 
            and more sustainable lifestyle.
          </p>
          
          <p>
            Our team of experts is dedicated to ensuring that each plant meets our 
            strict standards of quality and care. Whether you're a seasoned gardener 
            or just starting your green journey, we're here to support you every step 
            of the way.
          </p>
          
          <p>
            Join us in our mission to create a greener, healthier world. 
            Visit Paradise Nursery today and experience the beauty of nature 
            right at your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;