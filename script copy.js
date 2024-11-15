// // Image and Review Carousels with Improved Infinite Loop
// const setupInfiniteCarousel = (selector, interval) => {
//   const container = document.querySelector(selector);
//   let items = container.children;

//   // Ensure cloning logic handles updates properly
//   const firstClone = items[0].cloneNode(true);
//   const lastClone = items[items.length - 1].cloneNode(true);
  
//   container.appendChild(firstClone);
//   container.insertBefore(lastClone, items[0]);
  
//   items = container.children; // Update items to include the clones

//   let index = 1;
//   let isTransitioning = false;
//   container.style.transform = `translateX(-${index * 100}%)`;

//   const updateCarousel = () => {
//     if (isTransitioning) return; // Prevent multiple transitions
//     isTransitioning = true;
    
//     index++;
//     container.style.transition = 'transform 0.5s ease-in-out';
//     container.style.transform = `translateX(-${index * 100}%)`;

//     container.addEventListener('transitionend', () => {
//       isTransitioning = false;
//       if (index === items.length - 1) {
//         container.style.transition = 'none';
//         index = 1;
//         container.style.transform = `translateX(-${index * 100}%)`;
//       } else if (index === 0) {
//         container.style.transition = 'none';
//         index = items.length - 2;
//         container.style.transform = `translateX(-${index * 100}%)`;
//       }
//     }, { once: true });
//   };

//   setInterval(updateCarousel, interval);
// };

// // Initialize Carousels
// setupInfiniteCarousel('#carousel-slide', 10000);  // Image carousel every 10 seconds
// setupInfiniteCarousel('#review-slide', 5000);     // Review carousel every 5 seconds

// Carousel for Reviews

let reviewIndex = 0;
const reviewSlides = document.querySelectorAll('.reviews');
const totalReviews = reviewSlides.length;

function showReview(index) {
    const reviewContainer = document.getElementById('review-slide');
    reviewContainer.style.transform = `translateX(-${index * 100}%)`;
}

function nextReview() {
    reviewIndex = (reviewIndex + 1) % totalReviews;
    showReview(reviewIndex);
}
setInterval(nextReview, 5000);  // Change review every 5 seconds