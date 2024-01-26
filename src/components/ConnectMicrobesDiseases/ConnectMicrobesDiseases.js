import React from 'react';

export default function ConnectMicrobesDiseases() {
    const handleButtonClick = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/connect-microbes-to-diseases/', {
          method: 'POST',
        });
    
        // Check if the request was successful
        if (response.ok) {
          // If the HTTP status code is 200-299
          const data = await response.json();
          console.log(data);
          alert('Edges successfully created');
        
        } else {
          // If the status code is not in the range 200-299
          const errorData = await response.json(); // Assuming the server sends a JSON response with error details
          console.error('Server responded with an error:', errorData.detail);
          alert(`Failed to create edges: ${errorData.detail}`);
        }
      
      } catch (error) {
        console.error('There was an error!', error);
        alert('An error occurred while trying to create edges.');
      }
    };

  return (
    <div className='py-3'>
      <header className='title text-center my-3'>
        <h1>Connect Microbes to Diseases</h1>
      </header>
      <div className='text-center upload-container mb-4'>
        <button onClick={handleButtonClick}>Create Edges</button>
      </div>
    </div>
  );
}
