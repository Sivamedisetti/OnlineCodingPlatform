import React, { useState } from "react";

const CustomDropdown = ({ codelang, setCodelang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newLang) => {
    setCodelang(newLang); // This will update the codelang in ProblemDetail
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="dropdown">
      <button className="dropdown-btn" onClick={() => setIsOpen(!isOpen)}>
        {codelang} ▾
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <a href="#" onClick={() => handleChange("cpp")}>
            C++
          </a>
          <a href="#" onClick={() => handleChange("java")}>
            Java
          </a>
          <a href="#" onClick={() => handleChange("python")}>
            Python3
          </a>
          <a href="#" onClick={() => handleChange("c")}>
            C
          </a>
          
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
