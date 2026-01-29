import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
    // Scroll to top when switching pages
    window.scrollTo(0, 0);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
    // Scroll to top when switching pages
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-container">
      {/* Landing/Home Page */}
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing_content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p>Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
          <div className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>

      {/* Product List Page */}
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList onHomeClick={handleHomeClick} />
      </div>

      {/* Page Transition Indicator */}
      <div className={`page-transition ${showProductList ? 'product-active' : 'home-active'}`}>
        <span className="page-indicator">
          {showProductList ? '🛍️ Shopping Plants' : '🏡 Home'}
        </span>
      </div>
    </div>
  );
}

export default App;