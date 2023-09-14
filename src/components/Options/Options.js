import React, { useState, useEffect } from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';

const healthFactorsJSON = require('../../data/healthFactors');

export default function Options({ onFactorsChange }) {
  let healthFactors = healthFactorsJSON.map(factor => factor.name);

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

  // Use useEffect to notify the parent component of changes
  useEffect(() => {
      onFactorsChange(selectedFactors);
  }, [selectedFactors, onFactorsChange]);

  return (
    <div className="columns-container">
      {Array.from({ length: 3 }).map((_, columnIndex) => (
        <div key={columnIndex} className="column">
          {healthFactors.slice(columnIndex * 6, (columnIndex + 1) * 6).map(factor => (
            <label key={factor} className="health-factor mt-2">
              <input 
                type="checkbox" 
                checked={selectedFactors.includes(factor)} 
                onChange={() => toggleFactor(factor)} 
              />
              <span className='options-text'>{capitalizeFirstLetter(factor)}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
