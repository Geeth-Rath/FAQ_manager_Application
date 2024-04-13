// Footer.js

import React from "react";
import "../../Styles/Footer.css";

const Footer = () => {
  return (
    <div>
         <div class="row  d-flex align-items-center text-center">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-12 col-lg-auto d-flex justify-content-center mb-2 copyright">
            <p class="mb-0 text-muted ">
              Copyright @ iLabs, All Rights Reserved
            </p>
          </div>
    
          <div className="col-12 col-lg-auto d-flex justify-content-center mb-2 term">
            <div>
              <ul class="nav flex-column flex-md-row justify-content-center justify-content-md-end">
                <li class="nav-item">
                  <a href="#" class="nav-link px-2 text-muted">
                    Terms of Service
                  </a>
                </li>
                <li class="nav-item d-none d-md-block">
                  <a href="#" class="nav-link px-2 text-muted">
                    |
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link px-2 text-muted">
                    Privacy Policy
                  </a>
                </li>
                <li class="nav-item d-none d-md-block">
                  <a href="#" class="nav-link px-2 text-muted">
                    |
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link px-2 text-muted">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
