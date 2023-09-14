import React, { useState } from 'react';

export default function GroupByHealthFactor() {
  

  const [checked, setChecked] = React.useState(false); 
  const [groupName, setGroupName] = useState('');

  const handleChange = (event) => {
    setChecked(event.target.checked);
  }

  const handleNameChange = (event) => {
    setGroupName(event.target.value);
    // console.log("Current groupName state:", groupName);
  };

  return (
    <div>
      <header className='title text-center my-3'>
        <h1>Group CpGs by Health Factor</h1>
      </header>
      <div className='options-wrapper flex-row'>
        <div className='col-3'>
          <div className='flex-row'>
            <input value = 'sleep' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Sleep</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'sleep' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Sleep</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'sleep' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Sleep</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'sleep' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Sleep</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'sleep' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Sleep</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'sleep' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Sleep</span>
          </div>
        </div>
        <div className='col-3'>
          <div className='flex-row'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
        </div>
        <div className='col-3'>
          <div className='flex-row'>
              <input value = 'weight loss' type = 'checkbox' onChange = {handleChange} />
              <span className='options-text'>Weight loss</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
          <div className='flex-row mt-2'>
            <input value = 'exercise' type = 'checkbox' onChange = {handleChange} />
            <span className='options-text'>Exercise</span>
          </div>
        </div>
      </div>
      <div className='name-wrapper'>
        <label for="groupNameInput">
          <h3>Enter group name:</h3>
        </label>
        <input 
          id="groupNameInput"
          type="text" 
          placeholder="Diabetes-Related CpGs" 
          value={groupName} 
          onChange={handleNameChange}
          className='group-name-input' 
        />
        <div className=''>
          <button type="submit">Generate Group</button>
        </div>
      </div>
    </div>
    
  )
}
