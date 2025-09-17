import { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);


  const API_URL = "API_URL"; 
  // 3. This is like OnInitializedAsync. It runs once on component mount.
  useEffect(() => {
    // We define an async function inside to fetch the data
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setMessage(data.message); 
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData(); // call the function :)
  }, []); // empty array = "run only once"


  return (
    <div>
      <h1>EchoScribe</h1>
      <h2>Message from our AWS Go API:</h2>
      {/* conditionally render content */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p style={{ color: 'green', fontWeight: 'bold' }}>{message}</p>
      )}
    </div>
  );
}

export default App;