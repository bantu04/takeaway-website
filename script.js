document.addEventListener('DOMContentLoaded', () => {
  const reviewSlideContainer = document.getElementById('review-slide');
  const reviews = document.querySelectorAll('.review');
  let currentIndex = 1;

  // Clone first and last review for seamless infinite loop
  const firstClone = reviews[0].cloneNode(true);
  const lastClone = reviews[reviews.length - 1].cloneNode(true);
  reviewSlideContainer.appendChild(firstClone);
  reviewSlideContainer.insertBefore(lastClone, reviewSlideContainer.firstChild);

  const totalSlides = reviews.length + 2; // Includes clones
  const reviewWidth = 100; // Each review takes up 100% of the container width
  reviewSlideContainer.style.transform = `translateX(-${reviewWidth}%)`;

  // Move to the next review
  function nextReview() {
      if (currentIndex >= totalSlides - 1) return; // Stop if last slide (clone)
      currentIndex++;
      updateReviewSlide();
  }

  // Move to the previous review
  function previousReview() {
      if (currentIndex <= 0) return; // Stop if first slide (clone)
      currentIndex--;
      updateReviewSlide();
  }

  // Update the slide position
  function updateReviewSlide() {
      reviewSlideContainer.style.transition = 'transform 0.5s ease-in-out';
      reviewSlideContainer.style.transform = `translateX(-${currentIndex * reviewWidth}%)`;

      // Reset position after transition for seamless loop
      reviewSlideContainer.addEventListener('transitionend', () => {
          if (currentIndex === totalSlides - 1) {
              reviewSlideContainer.style.transition = 'none';
              currentIndex = 1;
              reviewSlideContainer.style.transform = `translateX(-${currentIndex * reviewWidth}%)`;
          } else if (currentIndex === 0) {
              reviewSlideContainer.style.transition = 'none';
              currentIndex = totalSlides - 2;
              reviewSlideContainer.style.transform = `translateX(-${currentIndex * reviewWidth}%)`;
          }
      });
  }

  // Event listeners for buttons
  document.getElementById('next-review').addEventListener('click', nextReview);
  document.getElementById('previous-review').addEventListener('click', previousReview);

  // Swipe functionality for mobile
  let startX = 0;
  let endX = 0;

  // Start of swipe
  reviewSlideContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
  });

  // End of swipe
  reviewSlideContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
  });

  // Handle swipe gesture
  function handleSwipe() {
      if (startX - endX > 50) {
          nextReview(); // Swipe left for next review
      } else if (endX - startX > 50) {
          previousReview(); // Swipe right for previous review
      }
  }
});
