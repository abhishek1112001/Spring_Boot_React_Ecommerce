import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-50 to-teal-50 text-center py-6 shadow-lg">
      <span className="text-gray-800">
        Phegon Dev | All Rights Reserved &copy; {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default Footer;
