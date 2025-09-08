import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5001';

const ImageUploader = ({ projectId, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }

    if (!projectId) {
      console.warn('No projectId provided, uploading without project association');
    }

    const formData = new FormData();
    formData.append('image', file); 
    if (projectId) {
      formData.append('projectId', projectId);
    }

    try {
      setUploading(true);
      const res = await axios.post(`${API_URL}/api/images/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploadSuccess(res.data.image || res.data);
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error.response?.data || error.message);
      alert(`Failed to upload image: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept="image/*"
        disabled={uploading}
      />
      <button 
        onClick={handleUpload} 
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
};

export default ImageUploader;
