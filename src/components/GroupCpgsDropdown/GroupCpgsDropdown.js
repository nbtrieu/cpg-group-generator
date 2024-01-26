import React, { useState } from 'react';
// import Options from '../Options/Options';
import Dropdown from '../Dropdown/Dropdown';

import associationCategories from '../../data/associationCategories';
import searchFunctions from '../../data/searchFunctions';

export default function GroupCpgsDropdown() {
  const [groupName, setGroupName] = useState('');
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [selectedFunction, setSelectedFunction] = useState([]);
  const [htmlTable, setHtmlTable] = useState('');

  const handleNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleSubmit = async () => {
    const requestData = {
      factors: selectedFactors,
      cpg_group_name: groupName,
    };
    console.log(requestData);
  
    try {
      let response;
  
      if (selectedFunction === "AND") {
        response = await fetch('http://127.0.0.1:8000/group-cpgs-by-all-selected-factors/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
      } else if (selectedFunction === "OR") {
        response = await fetch('http://127.0.0.1:8000/group-cpgs-by-any-selected-health-factors/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
      } else {
        // Handle the case where neither "AND" nor "OR" is selected
        throw new Error('No search function selected or an invalid selection was made.');
      }
  
      if (response && response.ok) {
        const htmlContent = await response.text();
        setHtmlTable(htmlContent);
      } else {
        console.error('HTTP error:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };  

  return (
    <div>
      <header className='title text-center mt-4 mb-3'>
        <h1>Search Annotations</h1>
      </header>
      <div className=''>
        <h3 className='text-bold text-center'>Association Categories</h3>
        <Dropdown 
          isMulti 
          isSearchable 
          placeHolder="Select..." 
          options={associationCategories}
          onChange={setSelectedFactors}
        />
      </div>
      <div className='mt-3'>
        <h3 className='text-bold text-center'>Search Function</h3>
        <Dropdown 
          placeHolder="Select..." 
          options={searchFunctions}
          onChange={(value) => setSelectedFunction(value)}
        />
      </div>
      
      {/* <Options 
        onFactorsChange={setSelectedFactors}  // Pass the callback
      /> */}
      <div className='name-wrapper'>
        <label>
          <h3>Enter group name:</h3>
        </label>
        <input
          type="text" 
          placeholder="Diabetes-Related CpGs" 
          value={groupName} 
          onChange={handleNameChange}
          className='group-name-input' 
        />
        <div className=''>
          <button type="submit" onClick={handleSubmit}>Generate Group</button>
        </div>
      </div>
      {/* Render the HTML table */}
      <div dangerouslySetInnerHTML={{ __html: htmlTable }} />
    </div>
  )
}
