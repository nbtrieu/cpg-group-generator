import React, { useState, useEffect, useRef } from 'react';

export default function Dropdown({ placeHolder, options, isMulti, isSearchable, onChange }) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValues, setSelectedValues] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();

  // const toggleFactor = (factor) => {
  //   setSelectedFactors(prev => {
  //     if (prev.includes(factor)) {
  //       return prev.filter(f => f !== factor);
  //     } else {
  //       return [...prev, factor];
  //     }
  //   });
  // };

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter((option) => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  };
  
  useEffect(() => {
    const handler = () => setShowMenu(false);

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  });

  const handleInputClick = (event) => {
    event.stopPropagation();
    setShowMenu(!showMenu);
  };

  const CloseIcon = () => {
    return (
      <svg className="close-icon" height="20" width="20" viewBox="0 0 20 20">
        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
      </svg>
    );
  };

  const getDisplay = () => {
    if (!selectedValues || selectedValues.length === 0) {
      return placeHolder;
    }
    if (isMulti) {
      return (
        <div className="dropdown-tags">
            {selectedValues.map((option) => (
                <div key={option.value} className="dropdown-tag-item close-icon">
                    {option.label}
                    <span 
                      onClick={(e) => onTagRemove(e, option)} 
                      className="dropdown-tag-close"
                    >
                      <CloseIcon />
                    </span>
                </div>
            ))}
        </div>
      );
    }
    return selectedValues.label;
  };

  const removeOption = (option) => {
    return selectedValues.filter((o) => o.value !== option.value);
  };
  const onTagRemove = (option) => {
    const newValue = removeOption(option);
    setSelectedValues(newValue);
    onChange(newValue);
};

  const onItemClick = (option) => {
    let newValue;
    if (isMulti) {
      if (selectedValues.some((o) => o.value === option.value)) {
        newValue = selectedValues.filter((o) => o.value !== option.value);
      } else {
        newValue = [...selectedValues, option];
      }
    } else {
      newValue = option;
    }
    setSelectedValues(newValue);

    // The backend expects an array of values, so transform the array of objects
    // to an array of values before passing to onChange
    const valueToPass = isMulti ? newValue.map(o => o.value) : newValue.value;
    onChange(valueToPass);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValues.filter((o) => o.value === option.value).length > 0;
    }
    if (!selectedValues) {
      return false;
    }
    return selectedValues.value === option.value;
  };

  return (
    <div className="dropdown-container">
      <div onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="dropdown-menu">
        {isSearchable && (
          <div className="search-box">
            <input onChange={onSearch} value={searchValue} ref={searchRef} />
          </div>
        )}
        {getOptions().map((option) => (
          <div onClick={() => onItemClick(option)} key={option.value} className={`dropdown-item ${isSelected(option) && "selected"}`}>
            {option.label}
          </div>
        ))}
        </div>
      )}  
    </div>
  )
}