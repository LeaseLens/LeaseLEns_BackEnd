import React, { useState } from 'react';

function App() {
  const [imageId, setImageId] = useState(1); // Default image ID

  return (
    <div className="App">
      <h1>Image Display</h1>
      <img
        src={`http://localhost:3001/images/${imageId}`}
        alt="example_image"
        style={{ width: '300px' }}
      />
    </div>
  );
}

export default App;
