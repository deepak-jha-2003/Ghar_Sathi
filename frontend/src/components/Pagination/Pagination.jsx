// frontend/src/components/Pagination/Pagination.jsx - Fixed Mobile Scroll Issue
import React from 'react';
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

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      // Smooth scroll to services section with better mobile handling
      scrollToServices();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      // Smooth scroll to services section with better mobile handling
      scrollToServices();
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
    // Smooth scroll to services section with better mobile handling
    scrollToServices();
  };

  // Improved scroll function for mobile
  const scrollToServices = () => {
    // Add a small delay to allow page change to render first
    setTimeout(() => {
      const servicesSection = document.getElementById("services-display");
      if (servicesSection) {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          // On mobile, scroll to top of services with proper offset
          const headerHeight = 80; // Approximate navbar height
          const offsetTop = servicesSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: Math.max(0, offsetTop),
            behavior: 'smooth'
          });
        } else {
          // On desktop, use standard scroll behavior
          servicesSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          });
        }
      }
    }, 100); // Small delay to ensure DOM is updated
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