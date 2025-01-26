import React, { useState } from "react";

const CustomDropdown = ({ codelang, setCodelang, setCode}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (newLang) => {
    if(newLang === 'c') 
    {
      setCode(
`// Online C compiler to run C program online
#include <stdio.h>
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
`// Online java compiler to run java program online
class Main {
  public static void main(String[] args) {
    System.out.println("CodeForge");
  }
}
`);
    }
    else if(newLang === 'cpp')
    {
      setCode(
`// Online C++ compiler to run C++ program online
#include <iostream>
int main() {
  // Write C++ code here
  std::cout << "CodeForge";
  return 0;
}
`);
    }
    else setCode(
`# Enter your code here...
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
