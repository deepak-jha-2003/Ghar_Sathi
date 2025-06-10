// frontend/src/components/Pagination/Pagination.jsx - Fixed Mobile Scroll Issue
import React, { useState } from 'react';
import './Pagination.css';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showInfo = true,
  className = ""
}) => {
  // Don't render pagination if there's only one page or no pages
  if (totalPages <= 1) return null;

  // State to prevent double scrolling
  const [isScrolling, setIsScrolling] = useState(false);

  const handlePrevPage = () => {
    if (currentPage > 1 && !isScrolling) {
      setIsScrolling(true);
      onPageChange(currentPage - 1);
      // Scroll after state change with proper timing
      handleScrollToServices();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !isScrolling) {
      setIsScrolling(true);
      onPageChange(currentPage + 1);
      // Scroll after state change with proper timing
      handleScrollToServices();
    }
  };

  const handlePageClick = (page) => {
    if (!isScrolling) {
      setIsScrolling(true);
      onPageChange(page);
      // Scroll after state change with proper timing
      handleScrollToServices();
    }
  };

  // Improved scroll function with state management
  const handleScrollToServices = () => {
    // Wait for React to update the DOM with new content
    setTimeout(() => {
      const servicesSection = document.getElementById("services-display");
      if (servicesSection) {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          // Stop any ongoing scroll animations
          document.documentElement.style.scrollBehavior = 'auto';
          
          // Calculate target position
          const headerHeight = 80;
          const sectionTop = servicesSection.getBoundingClientRect().top + window.pageYOffset;
          const targetPosition = Math.max(0, sectionTop - headerHeight);
          
          // Scroll immediately to prevent any intermediate positions
          window.scrollTo(0, targetPosition);
          
          // Re-enable smooth scrolling for future interactions
          setTimeout(() => {
            document.documentElement.style.scrollBehavior = 'smooth';
            setIsScrolling(false);
          }, 100);
          
        } else {
          // Desktop behavior
          servicesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
          
          setTimeout(() => {
            setIsScrolling(false);
          }, 500);
        }
      } else {
        setIsScrolling(false);
      }
    }, 200); // Longer delay to ensure content is fully rendered
  };

  // Generate pagination numbers with smart ellipsis
  const generatePaginationNumbers = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    if (totalPages === 1) return [1];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  return (
    <div className={`pagination-wrapper ${className}`}>
      {/* Pagination Info */}
      {showInfo && (
        <div className="pagination-info">
          <p>
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems} items
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </p>
        </div>
      )}

      <div className="pagination-container">
        {/* Desktop Pagination */}
        <div className="pagination-controls">
          {/* Previous Button */}
          <button 
            className={`pagination-btn prev-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <span className="btn-icon">‹</span>
            <span className="btn-text">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="pagination-numbers">
            {generatePaginationNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="pagination-dots" aria-hidden="true">...</span>
                ) : (
                  <button
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageClick(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Button */}
          <button 
            className={`pagination-btn next-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <span className="btn-text">Next</span>
            <span className="btn-icon">›</span>
          </button>
        </div>

        {/* Mobile Pagination */}
        <div className="pagination-mobile">
          <button 
            className={`mobile-page-btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            ‹ Prev
          </button>
          
          <span className="mobile-page-info" aria-live="polite">
            {currentPage} of {totalPages}
          </span>
          
          <button 
            className={`mobile-page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            Next ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;