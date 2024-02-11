// Footer.js

import React from 'react';
import '../../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left">
        <p>Copyright @ iLabs, All Rights Reserved</p>
      </div>
      <div className="right">
        <p>
          <span>Terms of Service</span>
          <span>| </span>
          <span>Privacy Policy</span>
          <span>|</span>
          <span> Help Center</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
