import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <p>
        © {new Date().getFullYear()} AppXcelerate Solutions Pvt Ltd, HustleHub SB01, HSR Layout 5th Sector, Bengaluru-560034 | info@app-xcelerate.com | +91 9491434143. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
