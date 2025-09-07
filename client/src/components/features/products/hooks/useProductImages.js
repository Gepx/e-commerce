import { useState } from 'react';

const useProductImages = (productImages = []) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const visibleCount = 5;
  const visibleImages = productImages.slice(startIndex, startIndex + visibleCount);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + visibleCount < productImages.length) setStartIndex(startIndex + 1);
  };

  const showPrevImage = () => {
    setCurrentImg((prev) => prev - 1 + productImages.length) % productImages.length;
  };

  const showNextImage = () => {
    setCurrentImg((prev) => (prev + 1) % productImages.length);
  };

  const onMainTouchStart = (e) => setTouchStartX(e.changedTouches[0].clientX);

  const onMainTouchEnd = (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 40) {
      if (delta < 0) showNextImage();
      else showPrevImage();
    }
    setTouchStartX(null);
  };

  return {
    currentImg,
    setCurrentImg,
    startIndex,
    visibleImages,
    visibleCount,
    handlePrev,
    handleNext,
    showPrevImage,
    showNextImage,
    onMainTouchStart,
    onMainTouchEnd
  };
};

export default useProductImages;
