import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readAllCoursesThunk } from "../../store/courses";

function ViewAllCourses() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readAllCoursesThunk());
    }, [dispatch]);

    const allCourses = useSelector(state => Object.values(state.courses.allCourses));

    return (
        <div>
            {allCourses.map(course => (
                <div>
                    <h2>{course.name} by {course.instructor.name}</h2>
                    <h3>{course.category}</h3>
                    <p>{course.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewAllCourses;
