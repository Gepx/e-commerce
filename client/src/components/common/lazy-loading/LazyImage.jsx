import { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className, placeholder, quality = 80, sizes, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px 0px', // Load 50px before entering viewport
        threshold: 0.1
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Generate optimized image URLs (assuming your backend supports it)
  const getOptimizedSrc = (originalSrc, width) => {
    if (!originalSrc) return '';
    // Add query params for image optimization
    return `${originalSrc}?w=${width}&q=${quality}&f=webp`;
  };

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {!isLoaded && placeholder}

      {isInView && (
        <picture>
          {/* Modern formats with fallback */}
          <source
            srcSet={`${getOptimizedSrc(src, 300)} 300w, ${getOptimizedSrc(src, 600)} 600w, ${getOptimizedSrc(src, 1200)} 1200w`}
            sizes={sizes || '(max-width: 768px) 300px, (max-width: 1024px) 600px, 1200px'}
            type="image/webp"
          />
          <img
            src={getOptimizedSrc(src, 600)}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;
