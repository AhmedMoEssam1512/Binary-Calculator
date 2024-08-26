import React, { useState } from "react";

function Card() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [ddlist, setDdlist] = useState("add");
  const [ans, setAns] = useState("");
  const [error, setError] = useState("");

  const validateInput = () => {
    if (!/^[01]+$/.test(num1)) {
      return "The first number must be a binary number.";
    }
    if ((ddlist === "add" || ddlist === "sub") && !/^[01]*$/.test(num2)) {
      return "The second number must be a binary number.";
    }
    return "";
  };

  const fetchAdd = async () => {
    try {
      const response = await fetch(`http://localhost:5500/add/${num1}/${num2}`);
      console.log(response);
      
      const result = await response.json();
      setAns(result.sum);
      setError("");
    } catch (error) {
      setError('Error calculating sum: ' + error.message);
    }
  };

  const fetchComp = async () => {
    try {
      const response = await fetch(`http://localhost:5500/comp/${num1}`);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const result = await response.json();
      setAns(result.complement);
      setError("");
    } catch (error) {
      setError('Error calculating complement: ' + error.message);
    }
  };

  const fetchSub = async () => {
    try {
      const response = await fetch(`http://localhost:5500/sub/${num1}/${num2}`);
      
      const result = await response.json();
      setAns(result.difference);
      setError("");
    } catch (error) {
      setError('Error calculating difference: ' + error.message);
    }
  };

  const handleButtonClick = () => {
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(""); 
    switch (ddlist) {
      case "add":
        fetchAdd();
        break;
      case "sub":
        fetchSub();
        break;
      case "com":
        fetchComp();
        break;
      default:
        alert("Please select an operation");
    }
  };

  return (
    <div className="card">
      <p></p>
      <label htmlFor="operations">Select operation</label>
      <select
        id="operations"
        name="operations"
        value={ddlist}
        onChange={(e) => setDdlist(e.target.value)}
      >
        <option value="add">Addition</option>
        <option value="sub">Subtraction</option>
        <option value="com">Complement</option>
      </select>
      <p></p>
      <input
        type="text"
        placeholder="1st number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
      />
      <p></p>
      {(ddlist === "add" || ddlist === "sub") && (
        <input
          type="text"
          placeholder="2nd number "
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      )}
      <p></p>
      <button className="btn" onClick={handleButtonClick}>Calculate</button>
      <p></p>
      {error && <div className="error">Error: {error}</div>}
      {ans && <div className="result">Result: {ans}</div>}
    </div>
  );
}

export default Card;
