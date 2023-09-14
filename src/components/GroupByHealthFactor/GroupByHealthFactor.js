import React, { useState } from 'react';
import Options from '../Options/Options';

export default function GroupByHealthFactor() {
  const [groupName, setGroupName] = useState('');
  const [selectedFactors, setSelectedFactors] = useState([]);

  const handleNameChange = (event) => {
    setGroupName(event.target.value);
    // console.log("Current groupName state:", groupName);
  };

  const handleSubmit = () => {
    // Use selectedFactors here
    console.log(selectedFactors);
  };

  return (
    <div>
      <header className='title text-center my-3'>
        <h1>Group CpGs by Health Factor</h1>
      </header>
      <Options 
        onFactorsChange={setSelectedFactors}  // Pass the callback
      />
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
    </div>
    
  )
}
