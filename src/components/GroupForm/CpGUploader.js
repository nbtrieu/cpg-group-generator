import React, { useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

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
      // console.log("Current groupName state:", groupName);
  };

  const fetchData = async () => {
    try {
        const formData = new FormData();
        formData.append('cpgFile', file);
        formData.append('groupName', groupName);

        const response = await axios.post('http://localhost:5000/run-import-cpg-data', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });

        console.log(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Initially clear any previous messages
    setMessage('');

    // Check if either file or groupName is missing -- BUG: not working for some reason..
    if (!file || !groupName) {
      console.log('>>> no file or no name provided');
      setMessage('Please provide both a valid file and a group name.');
      console.log("Current message state:", message);
      return;  // Exit early
  }

    try {
      if (file) {
        Papa.parse(file, {
          complete: async (result) => {
            console.log('Parsed Result:', result);
            const cpGs = result.data.map(row => row[0]); // **PROVIDE TEMPLATE wherein FIRST column has the cpg names
            console.log('CpGs:', cpGs);  
            
            // After parsing and possibly validating the file, send data to backend
            await fetchData();

            // Once the file is successfully sent and processed, update the message and reset other states
            setMessage('Your CpG group has been generated.');
            setTimeout(() => {
                setMessage('');
                setFileName('');
                setFile(null);
                setGroupName('');
            }, 5000);
          },
          header: false
        });
      } 
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
          <button onClick={handleSubmit} type="submit" disabled={!file || !groupName}>Submit</button>
        </div>
        <div className='mb-3 message'>
          <p>{message}</p>
        </div>
      </div>
  );
};

export default CpGUploader;
