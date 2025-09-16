import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      course: "React Complete Course 2024",
      rating: 5,
      date: "2 weeks ago",
      review: "Absolutely fantastic course! The instructor explains complex concepts in a very clear and engaging way. The hands-on projects really helped me understand React deeply.",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      course: "JavaScript Mastery Bootcamp",
      rating: 4,
      date: "1 month ago",
      review: "Great content and well-structured curriculum. Some sections could be a bit more detailed, but overall it's a solid course that helped me land my first developer job!",
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      course: "Full Stack Development Path",
      rating: 5,
      date: "3 days ago",
      review: "This course exceeded my expectations! The instructor's teaching style is perfect and the community support is amazing. Highly recommend to anyone serious about web development.",
      verified: true
    },
    {
      id: 4,
      name: "David Thompson",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      course: "Node.js & Express Fundamentals",
      rating: 4,
      date: "2 months ago",
      review: "Solid course with practical examples. The backend concepts are explained well and the projects are relevant to real-world scenarios. Could use more advanced topics.",
      verified: false
    },
    {
      id: 5,
      name: "Lisa Park",
      profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      course: "MongoDB Database Design",
      rating: 5,
      date: "1 week ago",
      review: "Outstanding course! As someone who struggled with database concepts before, this course made everything click. The exercises are challenging but rewarding.",
      verified: true
    },
    {
      id: 6,
      name: "James Wilson",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      course: "Python for Beginners",
      rating: 3,
      date: "2 weeks ago",
      review: "Good introduction to Python but feels a bit rushed in some areas. Would benefit from more practice exercises. Still learned a lot though!",
      verified: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="bg-gray-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
       
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {reviews.map((review) => (
              <div key={review.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 hover:border-gray-600 transition-colors duration-300">
                  <div className="flex items-start space-x-4 mb-6">
                    <img
                      src={review.profileImage}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-600"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-white text-lg">
                          {review.name}
                        </h3>
                        {review.verified && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{review.course}</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className="text-yellow-400 font-semibold">
                          {review.rating}.0
                        </span>
                        <span className="text-gray-500 text-sm">•</span>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed text-base">
                    "{review.review}"
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 border border-gray-600"
            aria-label="Previous review"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-colors duration-200 border border-gray-600"
            aria-label="Next review"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        
        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex 
                  ? 'bg-blue-500' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Stats */}
        <div className="flex justify-center items-center mt-12 space-x-8 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold text-blue-400">4.6</div>
            <div className="text-sm text-gray-400">Average Rating</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-green-400">12,547</div>
            <div className="text-sm text-gray-400">Total Reviews</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold text-purple-400">89%</div>
            <div className="text-sm text-gray-400">Completion Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;