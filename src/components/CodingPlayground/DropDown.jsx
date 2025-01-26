import React, { useState } from "react";

const CustomDropdown = ({ codelang, setCodelang, setCode}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newLang) => {
    if(newLang === 'c') 
    {
      setCode(
`#include <stdio.h>
int main() {
  // Write C code here
  printf("CodeForge");
  return 0;
}
`);
    }
    else if(newLang === 'java') 
    {
      setCode(
`class Main {
  public static void main(String[] args) {
    // Write Java code here
    System.out.println("CodeForge");
  }
}
`);
    }
    else if(newLang === 'cpp')
    {
      setCode(
`#include <iostream>
int main() {
  // Write C++ code here
  std::cout << "CodeForge";
  return 0;
}
`);
    }
    else setCode(
`# Write python code here
print('Hello World!')
`);
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
