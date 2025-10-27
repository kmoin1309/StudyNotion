import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authAPI";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);

  // Get user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  if (profileLoading || authLoading || !user) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  const isStudent = user?.role === "STUDENT";
  const isInstructor = user?.role === "INSTRUCTOR";

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          {/* User Info Header */}
          <div className="mb-8 rounded-lg bg-richblack-800 p-6 border border-richblack-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, {user?.name}!
                </h1>
                <p className="text-richblack-300 text-lg">
                  Role:{" "}
                  <span className="font-semibold text-yellow-100">
                    {user?.role}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-richblack-400 text-sm mb-1">Email</p>
                <p className="text-white font-medium">{user?.email}</p>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#dc2626")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#ef4444")
                  }
                  className="mt-4 px-6 py-2 rounded-lg text-white font-semibold transition duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Student Dashboard */}
          {isStudent && (
            <div className="space-y-8">
              <div className="rounded-lg bg-richblack-800 border border-richblack-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Student Dashboard
                </h2>
                <p className="text-richblack-300 mb-6">
                  Track your learning progress and manage your enrolled courses.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-richblack-700 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">
                      Enrolled Courses
                    </h3>
                    <p className="text-richblack-300">
                      View and continue learning from your enrolled courses
                    </p>
                  </div>
                  <div className="bg-richblack-700 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">
                      Shopping Cart
                    </h3>
                    <p className="text-richblack-300">
                      Review and manage courses in your cart
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructor Dashboard */}
          {isInstructor && (
            <div className="space-y-8">
              <div className="rounded-lg bg-richblack-800 border border-richblack-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Instructor Dashboard
                </h2>
                <p className="text-richblack-300 mb-6">
                  Manage your courses, view analytics, and engage with students.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-richblack-700 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">
                      My Courses
                    </h3>
                    <p className="text-richblack-300">
                      View and edit all your published and draft courses
                    </p>
                  </div>
                  <div className="bg-richblack-700 p-4 rounded-lg">
                    <h3 className="text-white font-semibold mb-2">
                      Create New Course
                    </h3>
                    <p className="text-richblack-300">
                      Add a new course to your teaching portfolio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Outlet for nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
