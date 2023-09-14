import React, { useState } from 'react';
const healthFactorsJSON = require('../../data/healthFactors');

export default function Checkboxes() {
  let healthFactors = healthFactorsJSON.map(factor => factor.name);
  console.log(healthFactors);

  const [selectedFactors, setSelectedFactors] = useState([]);

  const toggleFactor = (factor) => {
    setSelectedFactors(prev => {
      if (prev.includes(factor)) {
        return prev.filter(f => f !== factor);
      } else {
        return [...prev, factor];
      }
    });
  };

  return (
    <div className="columns-container">
      {Array.from({ length: 3 }).map((_, columnIndex) => (
        <div key={columnIndex} className="column">
          {healthFactors.slice(columnIndex * 6, (columnIndex + 1) * 6).map(factor => (
            <label key={factor} className="health-factor">
              <input 
                type="checkbox" 
                checked={selectedFactors.includes(factor)} 
                onChange={() => toggleFactor(factor)} 
              />
              {factor}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
