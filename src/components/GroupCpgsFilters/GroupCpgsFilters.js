import React, { useState } from 'react';
import Filters from '../Filters/Filters';

export default function GroupCpgs() {
  const [groupName, setGroupName] = useState('');
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [htmlTable, setHtmlTable] = useState('');

  const handleNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleFiltersChange = (filters, condition) => {
    setSelectedFactors(Object.entries(filters).filter(([key, value]) => value).map(([key]) => key));
    setSelectedCondition(condition);
  };

  const groupFactorsByCondition = (factors, conditions) => {
    const groups = [];
    let currentGroup = [factors[0]];
  
    factors.slice(1).forEach((factor, index) => {
      const currentCondition = conditions[index];
  
      if (currentCondition === 'Or') {
        // End the current group and start a new group with the current factor.
        groups.push({ group: currentGroup, condition: 'And' }); // Previous group was connected by "And"
        currentGroup = [factors[index]]; // Start new group with the last factor of the previous group
      }
      // Add the current factor to the ongoing group.
      currentGroup.push(factor);
    });
  
    // Push the last group.
    if (currentGroup.length > 0) {
      groups.push({ group: currentGroup, condition: conditions[conditions.length - 1] || 'And' });
    }
  
    return groups;
  };
  
  const handleSubmit = async () => {
    const groupings = groupFactorsByCondition(selectedFactors, selectedCondition);
  
    for (const { group, condition } of groupings) {
      // Determine the endpoint based on the condition of the last factor in the group.
      const endpoint = condition === 'Or'
        ? 'http://127.0.0.1:8000/group-cpgs-by-any-selected-factors/'
        : 'http://127.0.0.1:8000/group-cpgs-by-all-selected-factors/';
      const requestData = {
        factors: group,
        cpg_group_name: groupName,
      };
  
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        if (response.ok) {
          const htmlContent = await response.text();
          setHtmlTable(prevHtmlTable => prevHtmlTable + htmlContent);
        } else {
          console.error('HTTP error:', response.statusText);
        }
      } catch (error) {
        console.error('Network error:', error.message);
      }
    }
  };  

  return (
    <div>
      <header className='title text-center my-3'>
        <h1>Search Annotations</h1>
      </header>
      <div className='filter-component'>
        <Filters onFiltersChange={handleFiltersChange} />
      </div>
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
      <div dangerouslySetInnerHTML={{ __html: htmlTable }} />
    </div>
  );
}
