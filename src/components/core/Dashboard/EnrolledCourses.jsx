import React, { useEffect } from 'react'
import { useSelector,useState } from 'react-redux'
import {getUserEnrolledCourses} from '../../../services/operations/profileAPI';
import { get } from 'http';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async() =>{
        try{
            const response = await getEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch{
            console.log("UNable to fetch Enrolled Courses");
        }
    }
    useEffect(()=>{
        getEnrolledCourses();
    },[])
 



  return (
    <div>
        <div>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>
                Loading...
            </div>)
            : !enrolledCourses.length ? (<p>You have not enrolled Courses yet</p>)
            : (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                        {/* Cards starts */}
                        {
                            enrolledCourses.map((course, index) => (
                                <div>
                                    <div>
                                        <img src={course.thumbnail}/>
                                        <div>
                                            <p>{course.courseName}</p>
                                            <p>{course.courseDescripton}</p>
                                        </div>
                                    </div>

                                    <div>
                                        {course?.totalDuration}
                                    </div>

                                    <div>
                                        <p> Progress : {course.progressPercentage || 0}%</p>
                                        <ProgressBar
                                        completed={course.progressPercentage}
                                        height='8px'
                                        isLabelVisible={false}
                                        />
                                        
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default EnrolledCourses