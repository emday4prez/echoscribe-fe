import { useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';


const API_URL = import.meta.env.VITE_API_URL 

function Uploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    setUploadStatus('Getting upload URL...');

    try {
      // get token
      const session = await fetchAuthSession();
       const jwtToken = session.tokens.accessToken.toString();
console.log("Sending this Access Token:", jwtToken);
      // fetch presigned url
      const response = await fetch(`${API_URL}/generate-upload-url?fileName=${selectedFile.name}`, {
        method: 'POST',
        headers: {
          'Authorization': jwtToken,
        },
      });

      if (!response.ok) {
         const errorText = await response.text();
        throw new Error(`Failed to get upload URL. Status: ${response.status}. Message: ${errorText}`);
      }

      const presignedUrl = await response.text();
      setUploadStatus('Uploading file...');

      // upload direct to s3 with presigned url
      const uploadResponse = await fetch(presignedUrl, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error('File upload failed.');
      }

      setUploadStatus('Upload successful!');
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload Your Audio File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}

export default Uploader;