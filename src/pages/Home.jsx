import React, { useState } from 'react';

function Home({ setIsLoading }) {
  const [progress, setProgress] = useState(0); // Use percentage for progress
  const [isLoading, setIsLoadingState] = useState(false); // Track if loading is in progress

  const playLoading = () => {
    // Reset progress and loading state before starting the loading
    setProgress(0);
    setIsLoadingState(true);

    const imageSources = [
      '/assest/background/btn-primary.png',
      '/assest/background/auth-bg.jpg'
            // Add more image URLs here
    ];

    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages += 1;
      const loadPercentage = (loadedImages / imageSources.length) * 100; // Calculate percentage
      setProgress(loadPercentage); // Update the progress state with the percentage

      if (loadedImages === imageSources.length) {
        setIsLoading(false); // Hide loading screen once all images are loaded
        setIsLoadingState(false); // Optionally reset the state to stop the loading indication
      }
    };

    // Preload all images
    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad; // When each image is loaded, update progress
    });
  };

  return (
    <div className='layout-pages flex-item-column-center'>
      <img className='home-page-content-img' src="/assest/img/avatar.jpeg" alt="Avatar" />
      {isLoading ? (
        <div className="progress-container3">
          <div className="progress-bar3" style={{ width: `${progress}%` }}></div>
        </div>
      ) : (
        <div className="button-card px300" onClick={playLoading}>Play</div>
      )}
    </div>
  );
}

export default Home;
