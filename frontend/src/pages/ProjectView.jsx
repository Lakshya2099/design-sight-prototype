import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageUploader from '../components/ImageUploader';
import FeedbackOverlay from '../components/FeedbackOverlay';
import FeedbackDetail from '../components/FeedbackDetail';
import RoleSwitcher from '../components/RoleSwitcher';

const API_URL = 'http://localhost:5001';

const ProjectView = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [activeFeedback, setActiveFeedback] = useState(null);
  const [currentRole, setCurrentRole] = useState('Developer');
  const [loading, setLoading] = useState(false);
  
  const projectId = '68bc6841039577f548b75d4f';

  // Initialize project when component mounts
  useEffect(() => {
    const initializeProject = async () => {
      try {
        await axios.post(`${API_URL}/api/projects/create-default`);
        console.log('Default project initialized');
      } catch (error) {
        console.error('Error initializing project:', error);
      }
    };
    
    initializeProject();
  }, []);
 
  const fetchImageDetails = (imageId) => {
    setLoading(true);
    axios.get(`${API_URL}/api/images/${imageId}`)
      .then(res => {
        setSelectedImage(res.data);
        setFeedback(res.data.feedback);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching image details:", err);
        setLoading(false);
      });
  };

  const handleImageUpload = (imageData) => {
    fetchImageDetails(imageData._id);
  };
  
  const handleAnalyzeClick = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/images/${selectedImage._id}/analyze`);
      // Start polling for analysis completion
      const interval = setInterval(async () => {
        const res = await axios.get(`${API_URL}/api/images/${selectedImage._id}`);
        if (res.data.analysisStatus === 'completed') {
          clearInterval(interval);
          fetchImageDetails(selectedImage._id);
        } else if (res.data.analysisStatus === 'failed') {
          clearInterval(interval);
          setLoading(false);
          alert('Analysis failed. Please check backend logs.');
        }
      }, 5000); // Poll every 5 seconds
    } catch (error) {
      console.error("Error starting analysis:", error);
      setLoading(false);
    }
  };

  const filteredFeedback = feedback.filter(item => item.roleTags.includes(currentRole));

  return (
    <div className="project-view">
      <header className="app-header">
        <h1>DesignSight</h1>
        <ImageUploader projectId={projectId} onUploadSuccess={handleImageUpload} />
      </header>
      
      <main className="main-content">
        <div className="image-container">
          {loading && <div className="loader">Analyzing... 🧠 This can take up to a minute.</div>}
          {selectedImage ? (
            <>
              <img src={`${API_URL}${selectedImage.path}`} alt="Design Screenshot" />
              <FeedbackOverlay 
                feedbackItems={filteredFeedback} 
                onSelectFeedback={setActiveFeedback}
                activeFeedbackId={activeFeedback?._id}
              />
            </>
          ) : (
            <p>Upload an image to get started. Project will be created automatically!</p>
          )}
        </div>

        <aside className="sidebar">
          <div className="sidebar-header">
            <RoleSwitcher currentRole={currentRole} onRoleChange={setCurrentRole} />
            <button onClick={handleAnalyzeClick} disabled={!selectedImage || loading}>
              {loading ? 'Analyzing...' : 'Run AI Analysis'}
            </button>
          </div>
          <div className="feedback-list">
            {filteredFeedback.length > 0 ? (
              filteredFeedback.map(item => (
                <div key={item._id} onClick={() => setActiveFeedback(item)}
                  className={`feedback-summary ${activeFeedback?._id === item._id ? 'active' : ''}`}>
                  <strong>{item.category}:</strong> {item.feedbackText}
                </div>
              ))
            ) : (
              <p>No feedback for the selected role. Run analysis or switch roles.</p>
            )}
          </div>
        </aside>
      </main>

      {activeFeedback && <FeedbackDetail feedbackItem={activeFeedback} onClose={() => setActiveFeedback(null)} />}
    </div>
  );
};

export default ProjectView;
