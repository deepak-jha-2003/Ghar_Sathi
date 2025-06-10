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
      preventScrollDuringTransition(() => {
        onPageChange(currentPage - 1);
      });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages && !isScrolling) {
      setIsScrolling(true);
      preventScrollDuringTransition(() => {
        onPageChange(currentPage + 1);
      });
    }
  };

  const handlePageClick = (page) => {
    if (!isScrolling) {
      setIsScrolling(true);
      preventScrollDuringTransition(() => {
        onPageChange(page);
      });
    }
  };

  // Prevent scroll during content transition
  const preventScrollDuringTransition = (pageChangeCallback) => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // Store current scroll position
      const currentScrollY = window.pageYOffset;
      
      // Method 1: CSS-based approach (more reliable)
      document.body.classList.add('pagination-transitioning');
      document.body.style.top = `-${currentScrollY}px`;
      
      // Execute page change
      pageChangeCallback();
      
      // Wait for React to render, then position and re-enable scroll
      requestAnimationFrame(() => {
        setTimeout(() => {
          const servicesSection = document.getElementById("services-display");
          
          // Remove transition class and reset styles
          document.body.classList.remove('pagination-transitioning');
          document.body.style.top = '';
          
          if (servicesSection) {
            // Calculate and set final position immediately
            const headerHeight = 80;
            const rect = servicesSection.getBoundingClientRect();
            const sectionTop = rect.top + window.pageYOffset;
            const targetPosition = Math.max(0, sectionTop - headerHeight);
            
            // Instant positioning without any animation
            window.scrollTo(0, targetPosition);
          } else {
            // Fallback: scroll to top if section not found
            window.scrollTo(0, 0);
          }
          
          setIsScrolling(false);
        }, 50); // Minimal delay for smooth transition
      });
      
    } else {
      // Desktop behavior - normal flow
      pageChangeCallback();
      setTimeout(() => {
        const servicesSection = document.getElementById("services-display");
        if (servicesSection) {
          servicesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
        setIsScrolling(false);
      }, 100);
    }
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