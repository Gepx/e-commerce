import { useEffect, useRef, useState } from 'react';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder,
  imgClassName = '',
  decoding = 'async',
  sizes,
  srcSet
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div className={`relative ${className}`}>
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}>
        {placeholder}
      </div>

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${imgClassName}`}
        loading="lazy"
        decoding={decoding}
        sizes={sizes}
        srcSet={srcSet}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true);
        }}
        style={{ opacity: isLoaded && !hasError ? 1 : 0 }}
      />

      {hasError && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500">
          Image unavailable
        </div>
      )}
    </div>
  );
};

export default LazyImage;
