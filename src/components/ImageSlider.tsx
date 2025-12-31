import { motion, AnimatePresence, PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";

interface ImageSliderProps {
  images: string[];
  alt: string;
  aspectRatio?: string;
}

export function ImageSlider({ images, alt, aspectRatio = "aspect-[16/9]" }: ImageSliderProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [[imageIndex, direction], setImageIndex] = useState([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageChange = (newDirection: number) => {
    const newIndex = currentImageIndex + newDirection;
    if (newIndex >= 0 && newIndex < images.length) {
      setCurrentImageIndex(newIndex);
      setImageIndex([newIndex, newDirection]);
    }
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      handleImageChange(1);
    } else if (swipe > swipeConfidenceThreshold) {
      handleImageChange(-1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <>
      <div className={`relative ${aspectRatio} rounded-2xl overflow-hidden bg-sand group`}>
        {/* Image Container with Slide Animation */}
        <div className="relative w-full h-full overflow-hidden">
          <motion.img
            key={imageIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            src={images[currentImageIndex]}
            alt={`${alt} - Image ${currentImageIndex + 1}`}
            className="absolute w-full h-full object-cover cursor-pointer"
            onClick={() => setIsFullscreen(true)}
            whileHover={{ scale: 1.02 }}
          />
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={() => handleImageChange(-1)}
              disabled={currentImageIndex === 0}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 hover:bg-background text-foreground transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed backdrop-blur-sm shadow-lg z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={() => handleImageChange(1)}
              disabled={currentImageIndex === images.length - 1}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/80 hover:bg-background text-foreground transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed backdrop-blur-sm shadow-lg z-20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Indicator Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setImageIndex([index, index > currentImageIndex ? 1 : -1]);
                }}
                className="group/dot relative"
                aria-label={`Go to image ${index + 1}`}
              >
                <div
                  className={`h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-8 bg-accent'
                      : 'w-2 bg-background/60 hover:bg-background/80'
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Fullscreen Expand Indicator */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsFullscreen(true);
          }}
          className="absolute top-4 left-4 p-2.5 rounded-full bg-background/80 hover:bg-background text-foreground transition-all backdrop-blur-sm shadow-lg lg:opacity-0 lg:group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Expand to fullscreen"
        >
          <Maximize2 className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsFullscreen(false)}
              className="fixed top-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              aria-label="Close fullscreen"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Image Counter in Fullscreen */}
            {images.length > 1 && (
              <div className="fixed top-6 left-6 z-[110] px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {/* Minimize Indicator */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(false);
              }}
              className="fixed bottom-6 right-6 z-[110] p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Exit fullscreen"
            >
              <Minimize2 className="w-6 h-6" />
            </motion.button>

            {/* Fullscreen Image Container */}
            <div 
              className="relative w-full h-full flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={`fullscreen-${imageIndex}`}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                src={images[currentImageIndex]}
                alt={`${alt} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing"
              />

              {/* Fullscreen Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <motion.button
                    onClick={() => handleImageChange(-1)}
                    disabled={currentImageIndex === 0}
                    className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </motion.button>

                  <motion.button
                    onClick={() => handleImageChange(1)}
                    disabled={currentImageIndex === images.length - 1}
                    className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed backdrop-blur-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </motion.button>
                </>
              )}

              {/* Fullscreen Indicator Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImageIndex([index, index > currentImageIndex ? 1 : -1]);
                      }}
                      className="group/dot relative"
                      aria-label={`Go to image ${index + 1}`}
                    >
                      <div
                        className={`h-2.5 rounded-full transition-all ${
                          index === currentImageIndex
                            ? 'w-10 bg-accent'
                            : 'w-2.5 bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}