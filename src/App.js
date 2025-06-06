// src/App.js
import { useState } from "react";

function App() {
  const [pepperoniIsChecked, setPepperoniIsChecked] = useState(false);

  const togglePepperoni = (e) => {
    setPepperoniIsChecked(e.target.checked);
  };

  return (
    <div>
      <h1>Select Pizza Toppings</h1>

      <div>
        <input
          type="checkbox"
          id="pepperoni"
          checked={pepperoniIsChecked}
          onChange={togglePepperoni}
          aria-checked={pepperoniIsChecked}
        />
        <label htmlFor="pepperoni">Add pepperoni</label>
      </div>

      <h2>Your Toppings:</h2>
      <ul>
        <li>Cheese</li>
        {pepperoniIsChecked && <li>Pepperoni</li>}
      </ul>
    </div>
  );
}

export default App;
