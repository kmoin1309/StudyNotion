import React, { useState, useEffect } from "react";
import {
  Plus,
  Loader,
  AlertCircle,
  CheckCircle,
  Book,
  Users,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    published: true,
  });

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  // Initialize user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({ ...parsedUser, token });
        fetchCourses(token);
      } catch (err) {
        setError("Failed to parse user data from localStorage");
      }
    } else {
      setError("No user data or token found in localStorage");
    }
  }, []);

  // Fetch all courses
  const fetchCourses = async (token) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:4000/courses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.statusText}`);
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new course
  const handleCreateCourse = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (!user || !user.token) {
      setError("User token is missing");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:4000/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          published: formData.published,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create course: ${response.statusText}`);
      }

      const newCourse = await response.json();
      setCourses([...courses, newCourse]);
      setFormData({ title: "", description: "", published: true });
      setShowForm(false);
      setSuccess("Course created successfully!");
      setTimeout(() => {
        setSuccess("");
        window.location.reload();
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-richblack-900 flex items-center justify-center px-4">
        <div className="bg-richblack-800 rounded-lg border border-richblack-700 p-8 max-w-md w-full text-center">
          <AlertCircle className="text-pink-200 mx-auto mb-6" size={56} />
          <h2 className="text-2xl font-bold text-richblack-5 mb-3">
            Access Denied
          </h2>
          <p className="text-richblack-200 mb-2">
            Unable to load your dashboard
          </p>
          <p className="text-sm text-richblack-400">
            Please log in again to continue
          </p>
        </div>
      </div>
    );
  }

  const isInstructor = user.role === "INSTRUCTOR";
  const publishedCount = courses.filter((c) => c.published).length;

  return (
    <div className="min-h-screen bg-richblack-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* User Profile Header */}
        <div className="mb-8 bg-richblack-800 border border-richblack-700 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-richblack-400 text-sm mb-1">Welcome back,</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-richblack-5 mb-2">
              {user?.name}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <p className="text-richblack-300">
                <span className="text-richblack-400">Email:</span> {user?.email}
              </p>
              <span className="hidden sm:block text-richblack-600">•</span>
              <span className="px-3 py-1 bg-yellow-50 text-richblack-900 rounded-full text-xs sm:text-sm font-semibold">
                {user?.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2 bg-pink-200 text-richblack-900 rounded-lg hover:bg-pink-300 transition font-semibold flex items-center justify-center gap-2 group"
          >
            <LogOut size={18} className="group-hover:scale-110 transition" />
            Logout
          </button>
        </div>

        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-richblack-5 mb-3">
                {isInstructor ? "My Courses" : "Learning Dashboard"}
              </h1>
              <p className="text-richblack-300 text-lg">
                {isInstructor
                  ? `Manage your courses and content`
                  : `Explore and enroll in courses`}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4 w-full sm:w-auto">
              <div className="flex-1 sm:flex-none bg-richblack-800 rounded-lg border border-richblack-700 p-4 text-center">
                <div className="text-yellow-50 text-3xl font-bold">
                  {courses.length}
                </div>
                <div className="text-richblack-400 text-sm mt-1">
                  Total Courses
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-pink-900 border border-pink-700 rounded-lg flex items-center gap-3">
            <AlertCircle className="text-pink-200 flex-shrink-0" size={20} />
            <p className="text-pink-200">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-caribbeangreen-900 border border-caribbeangreen-700 rounded-lg flex items-center gap-3">
            <CheckCircle
              className="text-caribbeangreen-200 flex-shrink-0"
              size={20}
            />
            <p className="text-caribbeangreen-200">{success}</p>
          </div>
        )}

        {/* Create Course Section - Instructor Only */}
        {isInstructor && (
          <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6 sm:p-8 mb-10">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-3 px-6 py-3 bg-yellow-50 text-richblack-900 rounded-lg hover:scale-105 transition-transform font-semibold group"
            >
              <Plus size={22} />
              Create New Course
            </button>

            {showForm && (
              <div className="mt-8 bg-richblack-700 rounded-lg p-6 border border-richblack-600">
                <h3 className="text-2xl font-bold text-richblack-5 mb-6">
                  Course Information
                </h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-richblack-5 mb-3">
                      Course Title <span className="text-pink-200">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g., Introduction to React"
                      className="w-full px-4 py-3 bg-richblack-600 border border-richblack-500 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-richblack-5 mb-3">
                      Course Description{" "}
                      <span className="text-pink-200">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe what students will learn in this course..."
                      rows="5"
                      className="w-full px-4 py-3 bg-richblack-600 border border-richblack-500 rounded-lg text-richblack-5 placeholder-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50 transition resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-richblack-600 rounded-lg">
                    <input
                      type="checkbox"
                      id="published"
                      checked={formData.published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          published: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-yellow-50 rounded focus:ring-2 focus:ring-yellow-50 cursor-pointer"
                    />
                    <label
                      htmlFor="published"
                      className="text-sm font-medium text-richblack-5 cursor-pointer flex-1"
                    >
                      Publish this course immediately
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCreateCourse}
                      disabled={loading}
                      className="px-8 py-3 bg-yellow-50 text-richblack-900 rounded-lg hover:bg-yellow-100 disabled:opacity-50 transition font-semibold flex-1"
                    >
                      {loading ? "Creating..." : "Create Course"}
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="px-8 py-3 bg-richblack-600 text-richblack-100 rounded-lg hover:bg-richblack-500 transition font-semibold flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Courses Section */}
        <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-8">
            <Book className="text-yellow-50" size={28} />
            <h2 className="text-3xl font-bold text-richblack-5">
              {isInstructor ? "Your Courses" : "Available Courses"}
            </h2>
          </div>

          {loading && !courses.length ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader className="animate-spin text-yellow-50 mb-4" size={48} />
              <span className="text-richblack-300">Loading courses...</span>
            </div>
          ) : courses.length === 0 ? (
            <div className="text-center py-16">
              <Book className="text-richblack-400 mx-auto mb-4" size={48} />
              <p className="text-richblack-400 text-lg">
                {isInstructor
                  ? "No courses yet. Create your first course to get started!"
                  : "No courses available yet"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-richblack-700 border border-richblack-600 rounded-lg p-6 hover:border-yellow-50 hover:shadow-lg hover:shadow-yellow-50/20 transition-all duration-300 flex flex-col"
                >
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-semibold ${
                        course.published
                          ? "bg-caribbeangreen-900 text-caribbeangreen-100"
                          : "bg-richblack-600 text-richblack-300"
                      }`}
                    >
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3 className="text-lg font-bold text-richblack-5 mb-3 line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-richblack-300 text-sm mb-4 flex-1 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Instructor Info */}
                  <div className="border-t border-richblack-600 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Users
                        size={16}
                        className="text-yellow-50 flex-shrink-0"
                      />
                      <span className="text-richblack-300">
                        <span className="text-richblack-100 font-semibold">
                          {course.instructor.name}
                        </span>
                      </span>
                    </div>
                    <p className="text-richblack-400 text-xs">
                      {new Date(course.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
