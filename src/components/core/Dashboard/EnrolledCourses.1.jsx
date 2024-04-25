import React, { useEffect } from "react";
import { useSelector, useState } from "react-redux";

export const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const response = await getEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch {
      console.log("UNable to fetch Enrolled Courses");
    }
  };
  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <div>
      <div>Enrolled Courses</div>
      {!enrolledCourses ? (
        <div>Loading...</div>
      ) : !enrolledCourses.length ? (
        <p>You have not enrolled Courses yet</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p />
          </div>
        </div>
      )}
    </div>
  );
};
