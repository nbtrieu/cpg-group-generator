import React, { useState } from 'react';
import Papa from 'papaparse';

const CpGUploader = () => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [message, setMessage] = useState();

  const handleFileChange = (event) => {
      setFile(event.target.files[0]);
      if (event.target.files.length) {
        setFileName(event.target.files[0].name);
      }
  };

  const handleNameChange = (event) => {
      setGroupName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (file) {
        Papa.parse(file, {
            complete: (result) => {
                console.log('Parsed Result:', result);
                const cpGs = result.data.map(row => row[0]); // assuming first column has CpG names
                console.log('CpGs:', cpGs);                
            },
            header: false
        });
      }

      setMessage('Your CpG group has been generated.');
      setTimeout(() => {
        setMessage('');
        setFileName('');
        setFile(null);
        setGroupName('');
      }, 5000);
    
    } catch (error) {
      console.error('>>> handleFormSubmit error: ', error);
      setMessage(`Form was not submitted. ${error.message}`)
    }
    
  };

  return (
      <div className='form form-wrapper mx-4 my-3'>
        <div>
          <label>
            <h3>
              Upload a CSV file containing the names of the CpGs in the group:
            </h3>
          </label>
          <div className="file-input-wrapper">
            <label htmlFor="hiddenFileInput" className="custom-file-label">
                {fileName || "No file chosen..."} 
            </label>
            <input
                type="file"
                id="hiddenFileInput"
                onChange={handleFileChange}
                className="hidden-input"
            />
          </div>
        </div>
        <div className='file-input-wrapper'>
          <label>
            <h3>Enter group name:</h3>
          </label>
          <input 
            type="text" 
            placeholder="Favorite Diabetes-Related CpGs" 
            value={groupName} 
            onChange={handleNameChange}
            className='group-name-input' 
          />
        </div>
        <div className='my-3'>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className='mb-3 message'>
          <p>{message}</p>
        </div>
      </div>
  );
};

export default CpGUploader;
