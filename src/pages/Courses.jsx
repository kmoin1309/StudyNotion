import React from 'react';
import { Star } from 'lucide-react';

const Courses = () => {
  const starterCourses = [
    {
      id: 1,
      title: "Learn Modern JS with Next js and Mongo dB",
      price: "Rs. 1522",
      rating: 0,
      totalRatings: 0,
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Generative AI",
      price: "Rs. 2134",
      rating: 0,
      totalRatings: 0,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      price: "Rs. 999",
      rating: 0,
      totalRatings: 0,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop"
    }
  ];

  const dataScienceCourses = [
    {
      id: 4,
      title: "Introduction to Data Science",
      price: "Rs. 1899",
      rating: 0,
      totalRatings: 0,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop"
    },
    {
      id: 5,
      title: "Python for Data Analysis",
      price: "Rs. 2299",
      rating: 0,
      totalRatings: 0,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop"
    },
    {
      id: 6,
      title: "Machine Learning Fundamentals",
      price: "Rs. 3499",
      rating: 0,
      totalRatings: 0,
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${rating > index ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
      />
    ));
  };

  const CourseCard = ({ course }) => (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors cursor-pointer">
      <div className="h-48 bg-gray-700 relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 w-8 h-8 bg-green-500 rounded-full"></div>
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium mb-3 line-clamp-2 min-h-[3rem]">
          {course.title}
        </h3>
      
        <div className="text-white font-semibold text-lg">
          {course.price}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Courses to get you started section */}
        <div className="mb-12">
          <h1 className="text-white text-3xl font-bold mb-6">Courses to get you started</h1>
          
          <div className="flex gap-6 mb-8">
            <button className="text-yellow-400 font-medium border-b-2 border-yellow-400 pb-2">
              Most Popular
            </button>
            <button className="text-gray-400 font-medium hover:text-white transition-colors">
              New
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {starterCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Top courses in Data Science section */}
        <div>
          <h2 className="text-white text-3xl font-bold mb-8">Top courses in Data Science</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataScienceCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;