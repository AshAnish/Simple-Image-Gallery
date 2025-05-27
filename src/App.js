import React, { useState, useEffect } from 'react';

// Custom hook for handling image data
const useImageFetcher = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      const imageData = [
        { id: 1, url: 'https://t4.ftcdn.net/jpg/03/21/43/07/360_F_321430761_qQi0CU9tzI5w1k1vJgdA02LMtXtsXvJE.jpg', title: 'Hacker image' },
        { id: 2, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8_DtedtVwk8-scOCBoMzzSeSU_xWbF-5BVA&s', title: 'Basic Linux Logo' },
        { id: 3, url: 'https://www.kali.org/wallpapers/images/2020.4/kali-neon.png', title: 'Kali Linux Logo' },
        { id: 4, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdUA8OyAYssOA_WnpzFmjdNrsWSrh-klb8pw&s', title: 'Arch Linux Logo' },
        { id: 5, url: 'https://cdn.cyberpunk.rs/wp-content/uploads/2018/08/PARROT.jpg', title: 'Parrot Linux Logo' },
        { id: 6, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYfLjyunDFihF41MjFiNiL9PjQN0xKBq-nwA&s', title: 'Garuda Linux Logo' },
        { id: 7, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMCKD-jk0CJ8HyV-1zRyNmdUG0dT7fZEAypQ&s', title: 'Ubuntu Logo' },
        { id: 8, url: 'https://e7.pngegg.com/pngimages/388/781/png-clipart-microsoft-logo-windows-xp-microsoft-rectangle-computer.png', title: 'Windows Logo' },
        { id: 9, url: 'https://cdn.worldvectorlogo.com/logos/mac-os-2.svg', title: 'Mac Logo' },
        { id: 10, url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Debian_logo.png', title: 'Debian Distro Logo' },
        { id: 11, url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fedora_logo.svg/2048px-Fedora_logo.svg.png', title: 'Fedora Linux Logo' },
        { id: 12, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBB1grPRbo4YkB_kphI5HNzHSUjgxykqVJfQ&s', title: 'Mint Linux Logo' }
      ];
      setImages(imageData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { images, loading };
};

// Image Thumbnail Component
const ImageThumbnail = ({ image, onClick }) => {
  return (
    <div 
      className="image-thumbnail"
      onClick={() => onClick(image)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(image);
        }
      }}
      aria-label={`View ${image.title} in full size`}
    >
      <img 
        src={image.url} 
        alt={image.title}
        loading="lazy"
      />
      <div className="image-overlay">
        <h3>{image.title}</h3>
      </div>
    </div>
  );
};

// Modal Viewer Component
const ModalViewer = ({ image, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !image) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content">
        <button 
          className="close-button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <img 
          src={image.url} 
          alt={image.title}
          className="modal-image"
        />
        <h2 id="modal-title" className="modal-title">{image.title}</h2>
      </div>
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div className="gallery-grid">
      {images.map(image => (
        <ImageThumbnail 
          key={image.id} 
          image={image} 
          onClick={onImageClick}
        />
      ))}
    </div>
  );
};

// Theme Toggle Component
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button 
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          <div className="toggle-icon">
            {isDark ? '😴' : '😎'}
          </div>
        </div>
        <div className="toggle-bg-elements">
          <div className="stars"></div>
          <div className="clouds"></div>
        </div>
      </div>
    </button>
  );
};

// Main App Component
const App = () => {
  const { images, loading } = useImageFetcher();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="theme-particles"></div>
      
      <header className="app-header">
        <div className="header-content">
          <div className="title-section">
            <h1>OS Logos Display</h1>
            <p>Click on any image to view the logo</p>
            <br></br>
            <p>Hover over the image to know the name</p>
          </div>
          <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
        </div>
      </header>
      
      <main>
        <ImageGallery 
          images={images} 
          onImageClick={handleImageClick}
        />
      </main>

      <ModalViewer 
        image={selectedImage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          min-height: 100vh;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .app {
          min-height: 100vh;
          padding: 2rem;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow-x: hidden;
        }

        /* Dark Mode Styles */
        .app.dark-mode {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          color: white;
        }

        /* Light Mode Styles */
        .app.light-mode {
          background: linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%);
          color: #2d3436;
        }

        /* Animated Background Particles */
        .theme-particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.1;
          background-size: 100px 100px;
          animation: float 20s ease-in-out infinite;
        }

        .dark-mode .theme-particles {
          background-image: 
            radial-gradient(circle at 25% 25%, #ffffff 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #ffffff 1px, transparent 1px);
        }

        .light-mode .theme-particles {
          background-image: 
            radial-gradient(circle at 25% 25%, #ffffff 3px, transparent 3px),
            radial-gradient(circle at 75% 75%, #ffffff 1.5px, transparent 1.5px);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .app-header {
          margin-bottom: 3rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
        }

        .title-section {
          text-align: left;
        }

        .app-header h1 {
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
          transition: all 0.5s ease;
        }

        .dark-mode .app-header h1 {
          color: #ffffff;
        }

        .light-mode .app-header h1 {
          color: #ffffff;
        }

        .app-header p {
          font-size: 1.1rem;
          opacity: 0.9;
          transition: all 0.5s ease;
        }

        /* Theme Toggle Styles */
        .theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50px;
          transition: all 0.3s ease;
          position: relative;
        }

        .theme-toggle:hover {
          transform: scale(1.05);
        }

        .theme-toggle:focus {
          outline: 2px solid rgba(255,255,255,0.5);
          outline-offset: 4px;
        }

        .toggle-track {
          width: 80px;
          height: 40px;
          background: rgba(255,255,255,0.2);
          border-radius: 25px;
          position: relative;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.3);
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dark-mode .toggle-track {
          background: linear-gradient(45deg, #1a1a2e, #16213e);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
        }

        .light-mode .toggle-track {
          background: linear-gradient(45deg, #74b9ff, #0984e3);
          box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .toggle-thumb {
          width: 32px;
          height: 32px;
          background: #ffffff;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .dark-mode .toggle-thumb {
          left: 4px;
          background: linear-gradient(45deg, #2d3436, #636e72);
        }

        .light-mode .toggle-thumb {
          left: 44px;
          background: linear-gradient(45deg, #fdcb6e, #f39c12);
        }

        .toggle-icon {
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .toggle-bg-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .stars, .clouds {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .dark-mode .stars {
          opacity: 1;
          background: 
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px),
            radial-gradient(circle at 70% 60%, rgba(255,255,255,0.6) 0.5px, transparent 0.5px),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.4) 0.5px, transparent 0.5px);
        }

        .light-mode .clouds {
          opacity: 1;
          background: 
            radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.6) 8px, transparent 8px),
            radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.4) 6px, transparent 6px);
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          color: white;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .image-thumbnail {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .dark-mode .image-thumbnail {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
        }

        .light-mode .image-thumbnail {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.8);
        }

        .image-thumbnail:hover {
          transform: translateY(-8px);
        }

        .dark-mode .image-thumbnail:hover {
          box-shadow: 0 12px 25px rgba(0,0,0,0.4);
        }

        .light-mode .image-thumbnail:hover {
          box-shadow: 0 12px 25px rgba(0,0,0,0.15);
        }

        .image-thumbnail:focus {
          outline: 3px solid #fff;
          outline-offset: 2px;
        }

        .image-thumbnail img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .image-thumbnail:hover img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: white;
          padding: 1.5rem 1rem 1rem;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .image-thumbnail:hover .image-overlay {
          transform: translateY(0);
        }

        .image-overlay h3 {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
          animation: fadeIn 0.3s ease;
          backdrop-filter: blur(20px);
          transition: all 0.3s ease;
        }

        .dark-mode .modal-backdrop {
          background: rgba(0,0,0,0.9);
        }

        .light-mode .modal-backdrop {
          background: rgba(116, 185, 255, 0.9);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { 
            transform: scale(0.8) translateY(20px);
            opacity: 0;
          }
          to { 
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        .modal-image {
          width: 100%;
          height: auto;
          max-height: 80vh;
          object-fit: contain;
          border-radius: 8px;
        }

        .modal-title {
          text-align: center;
          margin-top: 1rem;
          font-size: 1.5rem;
          font-weight: 300;
          transition: color 0.3s ease;
        }

        .dark-mode .modal-title {
          color: white;
        }

        .light-mode .modal-title {
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .close-button {
          position: absolute;
          top: -50px;
          right: 0;
          border: none;
          color: white;
          font-size: 2rem;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .dark-mode .close-button {
          background: rgba(255,255,255,0.2);
        }

        .light-mode .close-button {
          background: rgba(0,0,0,0.3);
        }

        .close-button:hover {
          transform: scale(1.1);
        }

        .dark-mode .close-button:hover {
          background: rgba(255,255,255,0.3);
        }

        .light-mode .close-button:hover {
          background: rgba(0,0,0,0.4);
        }

        .close-button:focus {
          outline: 2px solid white;
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .app {
            padding: 1rem;
          }

          .app-header h1 {
            font-size: 2rem;
          }

          .header-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .title-section {
            text-align: center;
          }

          .gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1rem;
          }

          .close-button {
            top: -40px;
            right: -10px;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
          
          .modal-backdrop {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default App;