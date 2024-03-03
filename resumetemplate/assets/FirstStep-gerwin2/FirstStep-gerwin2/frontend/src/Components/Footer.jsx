import React from "react";
import logo from "../images/logo.png";
import google from "../images/google.png";

function Footer() {
  return (
    <div className="flex flex-col justify-center items-center shadow-inner text-black p-8 mt-80">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold">FirstStep</h2>
      </div>
      <p className="text-md mb-4 font-medium">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Commodi, sapiente?{" "}
      </p>
      <p className="text-md mb-4 font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum totam
        velit sint corrupti iure tempore.
      </p>
      <hr className="border-t border-gray-600 w-full mb-4" />
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold">Contact us</p>
        <div className="flex">
          <a href="mailto:info@example.com" className="mr-4">
            <img src={google} alt="link" className="w-12 h-12" />
          </a>
          <a href="tel:+123456789" className="mr-4">
            <img src={google} alt="link" className="w-12 h-12" />
          </a>
          <a
            href="https://www.example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={google} alt="link" className="w-12 h-12" />
          </a>
        </div>
      </div>
      <p className="text-sm mt-4">
        &copy; 2024 FirstStep. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
