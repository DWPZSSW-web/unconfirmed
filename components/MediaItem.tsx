
import React, { useState, useEffect, useRef } from 'react';

interface MediaItemProps {
  src: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoHeight?: boolean;
}

const MediaItem: React.FC<MediaItemProps> = ({ 
  src, 
  alt, 
  className = "", 
  autoPlay = true, 
  loop = true, 
  muted = true,
  autoHeight = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 识别是否为视频
  const isVideo = src.match(/\.(mp4|webm|ogg|mov)$|^blob:|^data:video/i);

  // 16:9 抽象艺术占位图
  const placeholderUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop";

  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    
    if (!isVideo) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
      img.onerror = () => setError(true);
    } else {
      // 如果是视频，尝试重置状态
      if (videoRef.current) {
        videoRef.current.load();
      }
    }
  }, [src, isVideo]);

  // 监听 autoPlay 属性变化，确保视频播放
  useEffect(() => {
    if (isVideo && videoRef.current) {
      if (autoPlay) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.warn("Autoplay prevented:", error);
            // 某些浏览器可能因为未静音阻止自动播放，确保静音
            if (!muted && videoRef.current) {
               videoRef.current.muted = true;
               videoRef.current.play().catch(e => console.error("Retry play failed:", e));
            }
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [autoPlay, isVideo, muted]);

  const handleVideoLoad = () => setIsLoaded(true);
  const handleVideoError = () => {
    console.error(`Video failed to load: ${src}`);
    setError(true);
  };

  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${autoHeight ? 'w-full h-auto' : 'aspect-video'} ${className}`}>
      {/* 加载状态动画 */}
      {!isLoaded && !error && (
        <div className={`absolute inset-0 z-0 bg-neutral-950 flex flex-col items-center justify-center ${autoHeight ? 'min-h-[300px]' : ''}`}>
           <div className="w-12 h-[1px] bg-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/40 -translate-x-full animate-[shimmer_2s_infinite]"></div>
           </div>
        </div>
      )}

      {isVideo ? (
        <video
          ref={videoRef}
          src={src}
          className={`w-full ${autoHeight ? 'h-auto' : 'h-full object-cover'} transition-opacity duration-[1.5s] ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          onLoadedData={handleVideoLoad}
          onError={handleVideoError}
        />
      ) : (
        <img
          src={error ? placeholderUrl : src}
          alt={alt}
          className={`w-full ${autoHeight ? 'h-auto' : 'h-full object-cover'} transition-all duration-[1.5s] ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105 blur-sm'
          }`}
          loading="lazy"
          style={{ imageRendering: 'auto' }}
        />
      )}
      
      {/* 氛围层 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 border border-white/5 pointer-events-none" />
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default MediaItem;
