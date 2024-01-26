import React, { useState, useEffect } from 'react';
import healthFactors from '../../data/healthFactors';

const Filters = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState({});
  const [condition, setCondition] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const initialFiltersState = healthFactors.reduce((state, factor) => {
      state[factor.name] = false;
      return state;
    }, {});
    setFilters(initialFiltersState);
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleConditionChange = (event, index) => {
    let newConditions = [...condition];
    newConditions[index] = event.target.value;
    setCondition(newConditions);
  };

  const saveFilters = () => {
    setShowFilters(false);
    onFiltersChange(filters, condition);
  };

  const clearFilters = () => {
    const initialFiltersState = healthFactors.reduce((state, factor) => {
      state[factor.name] = false;
      return state;
    }, {});
    setFilters(initialFiltersState);
    setCondition([]);
    setShowFilters(false);
    onFiltersChange({}, []);
  };

  const toggleFiltersPopup = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="filter-button-container">
      <button className={`filter-criteria-button ${showFilters ? 'active' : ''}`} onClick={toggleFiltersPopup}>Filter Criteria</button>
      {showFilters && (
        <div className="filter-popup">
          <div className="filter-container">
            <div className="filter-header">
              <input type="search" placeholder="Filter by Factors" className="filter-search" />
              <button onClick={toggleFiltersPopup}>Close</button>
            </div>
            <div className="filter-content">
              {healthFactors.map((factor, index) => (
                <div className="filter-item" key={factor.name}>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      name={factor.name}
                      checked={filters[factor.name] || false}
                      onChange={handleCheckboxChange}
                    />
                    <span className="checkbox-label">{factor.name}</span>
                  </label>
                  {index < healthFactors.length - 1 && (
                    <div className="condition-selector">
                      <select value={condition[index] || 'And'} onChange={(e) => handleConditionChange(e, index)}>
                        <option value="And">And</option>
                        <option value="Or">Or</option>
                      </select>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="filter-actions">
              <button onClick={clearFilters} className="clear-filters-btn">Clear Filters</button>
              <button onClick={saveFilters} className="save-filters-btn">Save Filters</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
