import React, { useState } from 'react';
import axios from 'axios';

export default function AddArticles() {
  const [file, setFile] = useState();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('http://127.0.0.1:8000/add-articles/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('File uploaded successfully', response.data);
            } catch (error) {
                console.error('Error uploading file', error);
            }
        }
    };
  
  return (
    <div className='py-3'>
      <header className='title text-center my-3'>
        <h1>Add Articles</h1>
      </header>
      <div className='text-center upload-container mb-2'>
        <a href="http://127.0.0.1:8000/download-articles-template/" download>
          <button>Download Template</button>
        </a>
      </div>
      <div className='text-center upload-container'>
        <input className='upload-input' type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload CSV</button>
      </div>
    </div>
  )
}
